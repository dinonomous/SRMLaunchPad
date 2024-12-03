import React from "react";

interface VideoListProps {
  videos: { _id: string; title: string; url: string }[];
  onVideoSelect: (url: string, key: number) => void;
  selected: number;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, selected }) => {
  return (
      <ul className="space-y-4 text-xl text-white px-2">
        <h2 className="font-bold text-3xl mb-2">Sub Topics</h2>
        {videos.map((video,index) => (
          <li key={video._id} className={`${selected==index ? "bg-DarkPrimary-300":""} p-1 rounded-2xl px-1 border border-DarkSecondary-100`}>
            <button
              className="text-white hover:underline text-wrap text-left flex items-center relative p-1"
              onClick={() => onVideoSelect(video.url,index)}
            >
              {video.title}
            </button>
          </li>
        ))}
      </ul>
  );
};

export default VideoList;
