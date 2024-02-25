import React from 'react';
import '../css/video.css';

export default function Video(props) {
  return (
    <div className="video">
        <iframe src={props.url} frameborder="0"></iframe>
    </div>
  );
}
