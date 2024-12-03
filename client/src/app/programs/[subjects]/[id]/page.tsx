"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProgramsData } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import ReactQueryProvider from "@/components/QueryClientProvider";
import VideoList from "@/components/subjects/VideoList";
import VideoPlayer from "@/components/subjects/VideoPlayer";
import DocumentViewer from "@/components/DocumentViewer";
import Cookies from "js-cookie";
import WithSideNav from "@/components/shared/WithSideNav";

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
  Headding?: string;
}

const ExampleComponent: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [videoKey, setVideoKey] = useState(0);
  const { subjects, id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const uid = Cookies.get("uid");
    if (!uid) {
      router.replace("/login/user");
    }
  }, [router]);

  const { data, error, isLoading } = useQuery<ProgramData>({
    queryKey: ["collection", subjects, id],
    queryFn: () => getProgramsData(subjects as string, id as string),
    enabled: !!subjects && !!id,
  });

  useEffect(() => {
    if (data?.videos.length && !currentVideo) {
      setCurrentVideo(data.videos[0].url);
    }
    console.log(data)
  }, [data, currentVideo]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Function to handle video selection
  const handleVideoSelect = (videoUrl: string, key: number) => {
    setCurrentVideo(videoUrl);
    setVideoKey(key);
  };

  return (
    <WithSideNav
      sidebar={
        <VideoList
          videos={data?.videos || []}
          onVideoSelect={handleVideoSelect}
          selected={videoKey}
        />
      }
    >
      <div className="relative w-full h-full ">
        <div className="w-full min-h-fit overflow-x-auto p-4">
        <h2 className="font-bold text-3xl mb-2">{data?.Headding}</h2>
          <div className="min-h-[60vh] h-fit grid grid-cols-1 gap-4 w-full m-auto rounded-3xl mb-8 border border-DarkSecondary-100">
            <VideoPlayer key={videoKey} videoUrl={currentVideo} />
          </div>
          <div className="h-[90vh] m-auto rounded-3xl border-DarkSecondary-100 border">
            {data?.PDF?.map((pdf) => (
              <DocumentViewer
                key={pdf.path} // Added unique key
                documentId={pdf.path || "defaultDocumentId"}
                height={null}
              />
            ))}
          </div>
        </div>
      </div>
    </WithSideNav>
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
