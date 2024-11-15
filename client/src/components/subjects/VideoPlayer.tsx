import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayerReady = (event: any) => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full">
      {isLoading && (
        <Skeleton
          sx={{ bgcolor: "gray" }}
          variant="rounded"
          height={"67vh"}
          className="mb-2 rounded-2xl" 
        />
      )}

      <div style={{ display: isLoading ? "none" : "block" }} className="h-full">
        <YouTube
          videoId={videoUrl}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 0,
              mute: 1,
            },
          }}
          iframeClassName="rounded-2xl"
          onReady={handlePlayerReady} 
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
