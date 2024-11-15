const { google } = require("googleapis");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 });

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

async function getDriveChanges(pageToken) {
  return await drive.changes.list({
    pageToken: pageToken,
    fields: "newStartPageToken, changes(file(id, name, mimeType, parents))",
  });
}

async function listRootFolders(req, res) {
  const rootFolderId = "1P6T-OqLXQtD3DNPSniWqu1tzO40pmlQV";
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageToken = req.query.pageToken || null; 

  const cacheKey = `rootFolders_${pageToken || 'initial'}`;
  console.log(pageToken + " " + pageSize);

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Returning cached root folders");
      return res.json(cachedData);
    }

    const result = await drive.files.list({
      q: `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id, name, mimeType, modifiedTime), nextPageToken",
      pageSize: pageSize,
      pageToken: pageToken,
    });    

    const folders = result.data.files.map((file) => ({
      name: file.name,
      id: file.id,
      type: "folder",
      modifiedTime: file.modifiedTime,
    }));    

    const nextPageToken = result.data.nextPageToken || null;
    const hasMore = !!nextPageToken; 

    const response = {
      folders,
      hasMore,
      nextPageToken,
    };

    cache.set(cacheKey, response);
    return res.json(response);
  } catch (error) {
    console.error("Error fetching root folders:", error);
    return res.status(500).json({ error: "Error fetching root folders." });
  }
}

async function listFolderContents(req, res) {
  const folderId = req.params.folderId;
  const pageSize = parseInt(req.query.pageSize) || 10; 
  const pageToken = req.query.pageToken || null; 
  const cacheKey = `folder_${folderId}_${pageToken || 'initial'}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Returning cached folder contents");
      return res.json(cachedData);
    }

    const result = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, modifiedTime), nextPageToken",
      pageSize: pageSize,
      pageToken: pageToken,
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

    const response = {
      files,
      hasMore,
      nextPageToken,
    };

    cache.set(cacheKey, response);

    return res.json(response);
  } catch (error) {
    console.error("Error fetching folder contents:", error);
    return res.status(500).json({ error: "Error fetching folder contents." });
  }
}

async function autoUpdateCache() {
  const pageTokenCacheKey = "drivePageToken";

  try {
    const cachedPageToken = cache.get(pageTokenCacheKey);
    const pageToken =
      cachedPageToken ||
      (await drive.changes.getStartPageToken()).data.startPageToken;

    const changeResponse = await getDriveChanges(pageToken);

    const changes = changeResponse.data.changes;
    const newPageToken = changeResponse.data.newStartPageToken;

    console.log("Detected changes in Google Drive:", changes);

    for (const change of changes) {
      if (
        change.file &&
        change.file.mimeType === "application/vnd.google-apps.folder"
      ) {
        const folderCacheKey = `folder_${change.file.id}`;
        cache.del(folderCacheKey);
      }
    }
    cache.set(pageTokenCacheKey, newPageToken);
  } catch (error) {
    console.error("Error checking for changes in Google Drive:", error);
  }
}

module.exports = { listFolderContents, listRootFolders, autoUpdateCache };
