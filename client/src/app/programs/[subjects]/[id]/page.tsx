"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProgramsData } from "@/utils/api";
import { useParams } from "next/navigation";
import ReactQueryProvider from "@/components/QueryClientProvider";
import VideoList from "@/components/VideoList";
import VideoPlayer from "@/components/VideoPlayer";
import DocumentViewer from "@/components/DocumentViewer";
import Navbar from "@/components/nav/Navbar";
import Wraper from "@/components/Wraper";

// Define types for the expected structure of data
interface Video {
  url: string;
  _id: string;
  title: string;
}

interface PDF {
  path: string;
}

interface ProgramData {
  videos: Video[];
  PDF?: PDF[];
}

const ExampleComponent: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [videoKey, setVideoKey] = useState(0);
  const { subjects, id } = useParams();

  const { data, error, isLoading } = useQuery<ProgramData>({
    queryKey: ["collection", subjects, id],
    queryFn: () => getProgramsData(subjects, id),
    enabled: !!subjects && !!id,
  });

  useEffect(() => {
    if (data && data.videos.length > 0) {
      setCurrentVideo(data.videos[0].url);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Function to handle video selection
  const handleVideoSelect = (videoUrl: string, Key: number) => {
    setCurrentVideo(videoUrl);
    setVideoKey(Key);
  };

  return (
    <Wraper>
      <Navbar />
      <div className="flex m-auto gap-4 bg-neutral-700 p-4 rounded-3xl w-fit my-8 max-w-[90%]">
        <div className="w-[70vw] h-[39.375vw] rounded-2xl">
          <VideoPlayer key={videoKey} videoUrl={currentVideo} />
        </div>
        <div className="w-[20%] h-[39.375vw]">
          <VideoList videos={data?.videos} onVideoSelect={handleVideoSelect} selected={videoKey}/>
        </div>
      </div>
      <div className="max-w-[90%] m-auto p-4 rounded-3xl">
        {data?.PDF?.map((pdfs) => {
          return (
            <DocumentViewer documentId={pdfs.path || "defaultDocumentId"} />
          );
        })}
      </div>
    </Wraper>
  );
};

const WrappedExampleComponent = () => {
  return (
    <ReactQueryProvider>
      <ExampleComponent />
    </ReactQueryProvider>
  );
};

export default WrappedExampleComponent;
