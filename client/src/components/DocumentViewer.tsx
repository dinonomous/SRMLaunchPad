import React from "react";

interface DocumentViewerProps {
  documentId: string; // Google Drive document ID
  height: number | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId, height }) => {
  const googleDriveFileUrl = `https://drive.google.com/file/d/${documentId}/preview`;

  return (
    <div className={`w-full h-[${height}vh] h-full`}>
      <iframe
        src={googleDriveFileUrl}
        width="100%"
        height="100%"
        allow="autoplay"
        frameBorder="0"
        title="Google Drive Document Viewer"
        className="rounded-3xl h-full"
      ></iframe>
    </div>
  );
};

export default DocumentViewer;
