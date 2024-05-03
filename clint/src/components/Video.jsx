import React from 'react';

export default function Video(props) {
  return (
    <div className="video skelition">
        <iframe src={props.url} frameborder="0"></iframe>
    </div>
  );
}
