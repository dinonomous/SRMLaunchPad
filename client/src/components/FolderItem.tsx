import React, { useState, useEffect } from "react";
import { getBooksChild, getBooksChildExpand } from "@/utils/api";
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiFolder,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";

interface Folder {
  name: string;
  id: string;
  type: "folder" | "file";
  modifiedTime: string;
}

// Utility function to create a slug
const createSlug = (name: string) =>
  encodeURIComponent(name.replace(/\s+/g, "-"));
const decodeSlug = (slug: string) =>
  decodeURIComponent(slug.replace(/-/g, " "));

interface FolderItemProps {
  folder: Folder;
  slug?: string[];
  toggleFile: (folderId: string, name: string) => void;
  onChildFoldersUpdate: (folderId: string, childFolders: Folder[]) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  slug = [],
  toggleFile,
  onChildFoldersUpdate,
}) => {
  const [children, setChildren] = useState<Folder[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Decode slug for comparison
  const decodedSlugs = slug.map(decodeSlug);
  const isFolderOpen = decodedSlugs.includes(folder.name); // Check if the folder is open based on decoded slugs
  const [open, setOpen] = useState<boolean>(isFolderOpen);
  const [nextPageToken, setnextPageToken] = useState<boolean>(isFolderOpen);
  const [expands, setExpand] = useState<string>("");

  useEffect(() => {
    const fetchChildFolders = async () => {
      if (isFolderOpen && !children && !loading) {
        setLoading(true);
        setError(null);
        try {
          const data = await getBooksChild(folder.id);
          setChildren(data.files);
          setnextPageToken(data.nextPageToken);
          setExpand(data.nextPageToken);
          onChildFoldersUpdate(folder.name, data.files);
        } catch (err) {
          setError("Failed to load child folders");
        } finally {
          setLoading(false);
        }
      }
    };

    setOpen(isFolderOpen);
    if (isFolderOpen) {
      fetchChildFolders();
    }
  }, [isFolderOpen]);

  const expand = async (id: string) => {
    try {
      setLoading(true);
      const data = await getBooksChildExpand(folder.id, expands);
  
      // Append new files to the existing children
      setChildren((prevChildren) => {
        const updatedChildren = [...(prevChildren || []), ...data.files];
        return updatedChildren;
      });

      setLoading(false);
  
      setnextPageToken(data.nextPageToken);
  
      // Update all the child folders, including both old and new
      onChildFoldersUpdate(folder.name, children ? [...children, ...data.files] : data.files);
  
      // Update expand state
      setExpand(data.nextPageToken);
    } catch (err) {
      setError("Failed to load child folders");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (folder.type === "folder") {
      const nextOpenState = !open;
      setOpen(nextOpenState);
      if (nextOpenState) {
        // Only update the slug if it's not already included
        if (!decodedSlugs.includes(folder.name)) {
          const newSlug = [...decodedSlugs, folder.name];
          router.push(`/books/g/${newSlug.map(createSlug).join("/")}`); // Use createSlug for routing
        }
        if (!children && !loading) {
          setLoading(true);
          setError(null);
          try {
            const data = await getBooksChild(folder.id);
            setChildren(data.files);
          } catch (err) {
            setError("Failed to load child folders");
          } finally {
            setLoading(false);
          }
        }
      } else {
        const newSlug = decodedSlugs.slice(
          0,
          decodedSlugs.indexOf(folder.name)
        ); // Remove current folder
        router.push(`/books/g/${newSlug.map(createSlug).join("/")}`); // Use createSlug for routing
        setChildren(null);
      }
    } else {
      toggleFile(folder.id, folder.name); // Ensure toggleFile is called here
    }
  };

  return (
    <>
      <li
        className={`p-2 shadow-md border min-h-16 z-10 border-DarkSecondary-100 overflow-hidden flex items-center space-x-3 cursor-pointer hover:bg-DarkSecondary-100 relative ${folder.type !== "folder" ? "rounded-full px-4":"rounded-xl bg-DarkPrimary-300"}`}
        onClick={handleClick}
      >
        {folder.type === "folder" ? (
          <div className="flex gap-2">
            {open ? (
              <FiChevronDown className="w-6 h-6" />
            ) : (
              <FiChevronRight className="w-6 h-6" />
            )}
            <FaFolder className="w-6 h-6" />
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
              slug={[...decodedSlugs]}
              toggleFile={toggleFile}
              onChildFoldersUpdate={onChildFoldersUpdate}
              
            />
          ))}
          {nextPageToken ? (
            <div className="mx-auto px-2">
              <button
                type="button" 
                className=" w-full h-12 justify-center rounded-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>{expand(expands)}}
              >
                Load More
                <FaArrowDown className="ml-2"/>
              </button>
            </div>
          ) : (
            <></>
          )}
        </ul>
      )}

      {/* Error and loading indicators */}
      {loading && (
        <ul className={`ml-8 mt-2 space-y-2`}>
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
