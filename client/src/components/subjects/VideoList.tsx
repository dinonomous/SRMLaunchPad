import React from "react";
import Image from "next/image";
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiFolder,
} from "react-icons/fi";

interface VideoListProps {
  videos: { _id: string; title: string; url: string }[];
  onVideoSelect: (url: string, key: number) => void;
  selected: number;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, selected }) => {
  return (
    <div className="bg-neutral-800 rounded-2xl p-4 h-full">
      <div className="flex gap-2 h-10 justify-center items-center">
        <h2 className="font-bold text-3xl mb-2">Sub Topics</h2>
      </div>

      <ul className="space-y-4 my-4 text-lg text-white overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-950 max-h-[90%] scrollbar-thumb-rounded scrollbar-track-transparent">
        {videos.map((video,index) => (
          <li key={video._id} className={`${selected==index ? "bg-DarkSecondary-100":""} p-1 rounded-lg`}>
            <button
              className="text-white hover:underline text-wrap text-left flex items-center relative"
              onClick={() => onVideoSelect(video.url,index)}
            >
            <FiChevronRight />
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
