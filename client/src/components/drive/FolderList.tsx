import React, { useEffect, useState, memo } from "react";
import { getBooksRoot } from "@/utils/api";
import FolderItem from "@/components/FolderItem";
import { Skeleton } from "@mui/material";

interface Folder {
  name: string;
  id: string;
  type: string;
}

interface FolderNavigationProps {
  slug: string[];
  toggleFile: (folderId: string, name: string) => void;
  onChildFoldersUpdate: (folderId: string, childFolders: Folder[]) => void;
  nextPageToken: string | null;
}

const FolderNavigation: React.FC<FolderNavigationProps> = memo(
  ({ slug, toggleFile, onChildFoldersUpdate, nextPageToken }) => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    console.log(nextPageToken);
    useEffect(() => {
      if (!hasFetched) {
        const fetchFolders = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await getBooksRoot();
            setFolders(data.folders);
            setHasFetched(true);
          } catch (err) {
            setError("Failed to fetch folders");
          } finally {
            setLoading(false);
          }
        };
        fetchFolders();
      }
    }, [hasFetched]);

    return (
      <div className="container w-1/4 h-fit border-DarkSecondary-100 dark:text-white">
        <div className="dark:bg-DarkPrimary-200 p-4 w-full h-[83vh] rounded-3xl overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-950 max-h-[90%] scrollbar-thumb-rounded scrollbar-track-transparent">
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <ul className="space-y-2">
              <div className="relative h-full">
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
                <Skeleton
                  sx={{ bgcolor: "gray" }}
                  variant="rounded"
                  height={36}
                  className="mb-2"
                />
              </div>
            </ul>
          ) : (
            <ul className="space-y-2 relative">
              <div className="h-full gap-4 flex flex-col relative">
                {folders.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    folder={folder}
                    slug={slug.slice(1)}
                    toggleFile={toggleFile}
                    onChildFoldersUpdate={onChildFoldersUpdate}
                    nextPageToken={nextPageToken}
                  />
                ))}
                {nextPageToken? <a href="">more</a> : <></> }
              </div>
            </ul>
          )}
        </div>
      </div>
    );
  }
);

export default FolderNavigation;
