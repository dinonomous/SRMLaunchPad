import React, { useEffect, useState } from 'react';

const VideoPlayer = ({ videoUrl, onReady, handlePlayPause }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Extract video ID from the URL
    const videoId = extractVideoId(videoUrl);

    // Load YouTube API script
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);

    // Initialize YouTube Player API
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1, // Autoplay setting, 0 for off, 1 for on
          controls: 0 // Controls setting, 0 for off, 1 for on
        },
        events: {
          onReady: (event) => {
            event.target.pauseVideo();
            onReady(event.target);
          },
        },
      });
      setPlayer(ytPlayer);
    };

    return () => {
      // Cleanup
      document.body.removeChild(script);
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoUrl, onReady]);

  // Function to extract video ID from URL
  const extractVideoId = (url) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <div id="player-container" className="video-container">
      <div id="player" className="video-iframe"></div>
    </div>
  );
};

export default VideoPlayer;
