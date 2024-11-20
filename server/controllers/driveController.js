const { google } = require("googleapis");
const cron = require("node-cron");
require("dotenv").config();
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://top-hen-29840.upstash.io',  // The Redis URL provided by Upstash
  token: process.env.REDIS_TOKEN,  // Your Upstash token (secure credential)
})

// redis.on("connect", () => console.log("Connected to Upstash Redis"));
// redis.on("error", (err) => console.error("Redis error", err));

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

async function getCachedData(key) {
  const data = await redis.get(key);
  // Check if the data exists and is a string (i.e., needs to be parsed)
  if (data && typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing cached data:", error);
      return null;
    }
  } else {
    return data; // If it's already an object or undefined, return it as is
  }
}

async function setCachedData(key, value, ttl = 3600) {
  // Ensure ttl is a valid number and greater than 0
  if (typeof ttl !== "number" || ttl <= 0) {
    console.error("Invalid TTL value, must be a positive number.");
    ttl = 3600; // fallback to default TTL
  }

  await redis.set(key, JSON.stringify(value), { EX: ttl }); // Correct usage with { EX: ttl }
}

async function pragnation(folderId, pageToken) {
  const pageSize = 10;
  const cacheKey = `folder_${folderId}_${pageToken || "initial"}`;

  try {
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log("Returning cached folder contents");
      preloadChildren(cachedData.files);
      return cachedData;
    }

    const result = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, modifiedTime), nextPageToken",
      pageSize,
      pageToken,
    });

    const files = result.data.files.map((file) => ({
      name: file.name,
      id: file.id,
      type: file.mimeType === "application/vnd.google-apps.folder" ? "folder" : "file",
      webViewLink: file.webViewLink,
      modifiedTime: file.modifiedTime,
    }));

    const nextPageToken = result.data.nextPageToken || null;
    const hasMore = !!nextPageToken;

    const response = { files, hasMore, nextPageToken };

    await setCachedData(cacheKey, response);

    preloadChildren(files);

    return response;
  } catch (error) {
    console.error("Error fetching paginated folder contents:", error);
    throw new Error("Error fetching folder contents.");
  }
}

async function preloadChildren(files) {
  console.log("Preloading children for files:", files);
  const folderFiles = files.filter(file => file.type === "folder");

  if (folderFiles.length === 0) return;

  Promise.all(
    folderFiles.map(async (folder) => {
      const folderCacheKey = `folder_${folder.id}_initial`;

      // Check if already cached
      const cachedData = await getCachedData(folderCacheKey);
      if (!cachedData) {
        try {
          // Fetch and cache the folder's children
          const result = await drive.files.list({
            q: `'${folder.id}' in parents and trashed = false`,
            fields: "files(id, name, mimeType, webViewLink, modifiedTime)",
            pageSize: 10,
          });

          const children = result.data.files.map((file) => ({
            name: file.name,
            id: file.id,
            type: file.mimeType === "application/vnd.google-apps.folder" ? "folder" : "file",
            webViewLink: file.webViewLink,
            modifiedTime: file.modifiedTime,
          }));

          await setCachedData(folderCacheKey, { files: children, hasMore: false, nextPageToken: null });
          console.log(`Cached children of folder ${folder.id}`);
        } catch (error) {
          console.error(`Error preloading children for folder ${folder.id}:`, error);
        }
      }
    })
  ).catch(error => {
    console.error("Error during folder preloading:", error);
  });
}

async function listRootFolders(req, res) {
  const rootFolderId = "1P6T-OqLXQtD3DNPSniWqu1tzO40pmlQV";
  const pageToken = req.query.pageToken || null;

  try {
    const response = await pragnation(rootFolderId, pageToken);
    return res.json(response);
  } catch (error) {
    console.error("Error fetching root folders:", error);
    return res.status(500).json({ error: "Error fetching root folders." });
  }
}

async function listFolderContents(req, res) {
  const folderId = req.params.folderId;
  const pageToken = req.query.pageToken || null;

  try {
    const response = await pragnation(folderId, pageToken);
    return res.json(response);
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    return res.status(500).json({ error: "Error fetching folder contents." });
  }
}

async function autoUpdateCache() {
  try {
    const changes = await getIncrementalChanges();

    for (const change of changes) {
      if (change.file && change.file.mimeType === "application/vnd.google-apps.folder") {
        const folderCacheKey = `folder_${change.file.id}`;
        await redis.del(folderCacheKey); // Invalidate folder cache
      }
    }
  } catch (error) {
    console.error("Error checking for changes in Google Drive:", error);
  }
}

module.exports = { listRootFolders, listFolderContents, autoUpdateCache };
