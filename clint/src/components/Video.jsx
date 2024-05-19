import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import left from '../assets/chevron-left-svgrepo-com.svg';
import right from '../assets/chevron-right-svgrepo-com.svg';

export default function Video(props) {
  const [showControls, setShowControls] = useState(false);
  const [player, setPlayer] = useState(null);

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handlePlayerReady = (playerInstance) => {
    setPlayer(playerInstance);
  };

  const handlePlayPause = () => {
    if (player) {
      const state = player.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  return (
    <>
      {props.reader ? (
        <>
          <div 
            className="video_small skelition" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handlePlayPause}
          >
            {showControls && (
              <div className="Video_overlay">
                <div className="Video_small_hover_controles">
                  <img src={left} alt="" />
                </div>
                <button className="videoControls" onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}>
                  Play/Pause
                </button>
                <div className="Video_small_hover_controles" onClick={props.next_click}>
                  <img src={right} alt=""  />
                </div>
              </div>
            )}
            <VideoPlayer videoUrl={props.url} onReady={handlePlayerReady} handlePlayPause={handlePlayPause} />
          </div>
        </>
      ) : (
        <>
          <div className="video skelition">
            <iframe src={props.url} frameBorder="0"></iframe>
          </div>
          <div className="video_bottom">
            <div className="video_next_field">
              <button className={`video_next button ${!props.next_bool && "button_gray"}`} onClick={props.next_click}>
                Next
              </button>
              <p className="video_next_text" dangerouslySetInnerHTML={{ __html: props.next }}></p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
