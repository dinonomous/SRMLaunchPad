import React from 'react';

export default function Video(props) {
  return (
    <>
    <div className="video skelition">
        <iframe src={props.url} frameborder="0"></iframe>
    </div>
    <div className="video_bottom">
      <div className="video_next_field">
        <button className={`video_next button ${props.next_bool===false && "button_gray"}`} onClick={props.next_click}>
          Next
        </button>
        <p className="video_next_text" dangerouslySetInnerHTML={{ __html: props.next}}></p>
      </div>
    </div>
    </>
  );
}
