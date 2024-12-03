"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getBooksRoot } from "@/utils/api";
import FolderNavigation from "@/components/drive/FolderList";
import FolderViewer from "@/components/drive/FolderView";
import { useRouter } from "next/navigation";
import ReactQueryProvider from "@/components/QueryClientProvider";
import Navbar from "@/components/nav/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Cookies from "js-cookie";

interface Folder {
  name: string;
  id: string;
  type: "folder" | "file";
  modifiedTime: string;
}

interface ApiResponse {
  folders: Folder[];
  hasMore: boolean;
  nextPageToken: string | null;
}

const Page: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFile, setOpenFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [children, setChildren] = useState<Folder[]>([]);
  const router = useRouter();

  useEffect(() => {
    const uid = Cookies.get("uid");
    console.log("UID:", uid); // Debug log to check the cookie value
    if (!uid) {
      router.replace("/login/user");
    }
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: ApiResponse = await getBooksRoot();
        setFolders(data.folders);
        setNextPageToken(data.nextPageToken);
      } catch {
        setError("Failed to fetch folders");
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const toggleFile = useCallback((folderId: string, name: string) => {
    setOpenFile(folderId);
    setFileName(name);
  }, []);

  const handleChildFoldersUpdate = useCallback(
    (folderId: string, childFolders: Folder[]) => {
      setChildren(childFolders);
    },
    []
  );

  return (
    <ReactQueryProvider>
      <AppRouterCacheProvider>
        <Navbar />
        <main className="pt-32" style={{ minHeight: "calc(100vh - 16rem)" }}>
          <div className="flex px-6 gap-4">
            <FolderNavigation
              toggleFile={toggleFile}
              onChildFoldersUpdate={handleChildFoldersUpdate}
              nextPageToken={nextPageToken}
            />
            <FolderViewer
              fileName={fileName}
              openFile={openFile}
              children={children}
              toggleFile={toggleFile}
            />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </main>
      </AppRouterCacheProvider>
    </ReactQueryProvider>
  );
};

export default Page;
