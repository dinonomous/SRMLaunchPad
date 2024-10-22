import React from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="w-full h-full">
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
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
