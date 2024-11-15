import React, { useState, useEffect } from "react";
import { CircularProgress, Skeleton } from "@mui/material";

interface DocumentViewerProps {
  documentId: string; // Google Drive document ID
  height: number | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentId,
  height,
}) => {
  const googleDriveFileUrl = `https://drive.google.com/file/d/${documentId}/preview`;

  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Iframe loading event listener to handle loading state
    const iframe = document.getElementById(
      "google-drive-iframe"
    ) as HTMLIFrameElement;

    if (iframe) {
      iframe.onload = () => {
        setIsLoading(false); // Once the iframe is loaded, set loading to false
      };
    }
  }, [documentId]);

  return (
    <div
      className={`w-full ${height ? `h-[${height}vh]` : ""} h-full`}
    >
      {isLoading && (
        <Skeleton
          sx={{ bgcolor: "gray" }}
          variant="rounded"
          height={"70vh"}
          className="mb-2"
        />
      )}

      <div style={{ display: isLoading ? "none" : "block" }} className="h-full">
        <iframe
          id="google-drive-iframe"
          src={googleDriveFileUrl}
          width="100%"
          height="100%"
          allow="autoplay"
          frameBorder="0"
          title="Google Drive Document Viewer"
          className="rounded-3xl h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default DocumentViewer;
