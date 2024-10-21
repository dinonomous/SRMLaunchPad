function extractYouTubeVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([-\w]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractGoogleDriveFileId(url) {
  const regex =
    /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|preview\/)|(?:docs|drive)\.google\.com\/.*?\/d\/)([a-zA-Z0-9_-]+)/;

  const match = url.match(regex);
  return match ? match[1] : null; // Return the file ID or null if not found
}

module.exports = { extractYouTubeVideoId, extractGoogleDriveFileId };
