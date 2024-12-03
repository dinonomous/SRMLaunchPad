import React, { useState, useEffect } from "react";
import { getBooksChild, getBooksChildExpand } from "@/utils/api";
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiFolder,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";
import { Skeleton } from "@mui/material";

interface Folder {
  name: string;
  id: string;
  type: "folder" | "file";
  modifiedTime: string;
}

interface FolderItemProps {
  folder: Folder;
  toggleFile: (folderId: string, name: string) => void;
  onChildFoldersUpdate: (folderId: string, childFolders: Folder[]) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  toggleFile,
  onChildFoldersUpdate,
}) => {
  const [children, setChildren] = useState<Folder[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  useEffect(() => {
    if (open && !children && !loading) {
      fetchChildFolders();
    }
  }, [open]);

  const fetchChildFolders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooksChild(folder.id);
      setChildren(data.files);
      setNextPageToken(data.nextPageToken || null);
      onChildFoldersUpdate(folder.id, data.files);
    } catch (err) {
      setError("Failed to load child folders");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreChildren = async () => {
    if (!nextPageToken) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getBooksChildExpand(folder.id, nextPageToken);
      setChildren((prevChildren) => [...(prevChildren || []), ...data.files]);
      setNextPageToken(data.nextPageToken || null);
      onChildFoldersUpdate(folder.id, [
        ...(children || []),
        ...data.files,
      ]);
    } catch (err) {
      setError("Failed to load more child folders");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (folder.type === "folder") {
      setOpen(!open);
    } else {
      toggleFile(folder.id, folder.name);
    }
  };

  return (
    <>
      <li
        className={`p-2 shadow-md border min-h-16 z-10 border-DarkSecondary-100 overflow-hidden flex items-center space-x-3 cursor-pointer hover:bg-DarkSecondary-100 relative ${
          folder.type !== "folder"
            ? "rounded-full px-4"
            : "rounded-xl bg-DarkPrimary-300"
        }`}
        onClick={handleClick}
      >
        {folder.type === "folder" ? (
          <div className="flex gap-2">
            {open ? (
              <FiChevronDown className="w-6 h-6" />
            ) : (
              <FiChevronRight className="w-6 h-6" />
            )}
            <FiFolder className="w-6 h-6" />
          </div>
        ) : (
          <FiFile className="w-6 h-6" />
        )}
        <p className="text-lg font-medium text-clip">{folder.name}</p>
      </li>
      {children && open && (
        <ul
          className={`ml-6 mt-2 relative space-y-2 ${
            open
              ? 'before:content-[""] before:absolute before:top-[-1.2rem] before:bottom-0 before:left-[-0.5rem] before:w-[1px] before:bg-DarkSecondary-300'
              : ""
          }`}
        >
          {children.map((childFolder) => (
            <FolderItem
              key={childFolder.id}
              folder={childFolder}
              toggleFile={toggleFile}
              onChildFoldersUpdate={onChildFoldersUpdate}
            />
          ))}
          {nextPageToken && (
            <div className="mx-auto px-2">
              <button
                type="button"
                className="w-full h-12 justify-center rounded-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={loadMoreChildren}
              >
                Load More
                <FaArrowDown className="ml-2" />
              </button>
            </div>
          )}
        </ul>
      )}

      {/* Error and loading indicators */}
      {loading && (
        <ul className="ml-8 mt-2 space-y-2">
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
        </ul>
      )}
      {error && <p className="ml-8 text-sm text-red-500">{error}</p>}
    </>
  );
};

export default FolderItem;
