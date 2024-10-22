"use client";
import React, { useEffect, useState } from "react";
import Wraper from "@/components/Wraper";
import { getBooksRoot } from "@/utils/api";
import DocumentViewer from "@/components/DocumentViewer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {
  FiChevronRight,
  FiFile,
  FiFolder,
} from "react-icons/fi";
import FolderNavigation from "@/components/drive/FolderList";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const createSlug = (name: string) =>
  encodeURIComponent(name.replace(/\s+/g, "-"));

interface Folder {
  name: string;
  id: string;
  type: string;
  modifiedTime: string;
}

interface ApiResponse {
  folders: Folder[];
  hasMore: boolean;
  nextPageToken: string | null;
}

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  }
  return text;
};

const Page: React.FC<{ params: { slug?: string[] | undefined } }> = ({
  params,
}) => {
  const router = useRouter();
  const { slug } = params;
  const [folders, setFolders] = useState<Folder[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openFile, setOpenFile] = useState<string | null>();
  const [fileName, setFileName] = useState<string | null>();
  const [children, setChildren] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: ApiResponse = await getBooksRoot();
        setFolders(data.folders);
        setNextPageToken(null);
      } catch (err) {
        setError("Failed to fetch folders");
      } finally {
        setLoading(false);
      }
    };
    console.log(slug);
    fetchFolders();
  }, []);

  const toggleFile = (folderId: string, name: string) => {
    setOpenFile(folderId);
    setFileName(name);
  };

  const handleChildFoldersUpdate = (
    folderId: string,
    childFolders: Folder[]
  ) => {
    setChildren(childFolders);
  };

  const handleBreadcrumbClick = (folderSlug: string[]) => {
    const newSlug = folderSlug.slice(1).map(createSlug).join("/");
    router.replace(`/books/g/${newSlug}`);
  };

  return (
    <Wraper>
      <div className="px-8 pb-4">
        {slug.length - 1 > 0 ? (
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<Typography className="dark:text-white">/</Typography>}
          >
            {slug && slug.length > 0 ? (
              slug.slice(1).map((folderName, index) => {
                const folderSlug = slug.slice(0, index + 2);
                const isLastItem = index === slug.length - 2; // Check if it's the last item

                return (
                  <div className="flex items-center text-xl" key={index}>
                    <Link
                      underline="hover"
                      color="white"
                      onClick={() => handleBreadcrumbClick(folderSlug)}
                      className={isLastItem ? "" : "max-w-[200px] truncate"} // Apply truncate only if it's not the last item
                      title={folderName} // Show full text on hover
                    >
                      {folderName}
                    </Link>
                  </div>
                );
              })
            ) : (
              <Typography sx={{ color: "white" }}>Root</Typography>
            )}
          </Breadcrumbs>
        ) : (
          <Typography sx={{ color: "white" }} className="">Open a file</Typography>
        )}
      </div>

      <div className="flex px-6 gap-4">
        <FolderNavigation
          slug={slug || []}
          toggleFile={toggleFile}
          onChildFoldersUpdate={handleChildFoldersUpdate}
          nextPageToken={nextPageToken}
        />

        <div className="w-3/4 h-[80vh] dark:border-white">
          <div className="h-full">
            {fileName ? (
              <div className="h-[3vh] px-2">
                <h1 className="text-2xl font-normal font">{fileName}</h1>
              </div>
            ) : (
              <></>
            )}

            <div className="h-[80vh] ">
              {openFile ? (
                <DocumentViewer documentId={openFile} height={null} />
              ) : (
                <div className="bg-DarkPrimary-200 h-[82vh] py-4 px-2 w-full rounded-2xl">
                  <div role="presentation" className="dark:text-white"></div>
                  <ul>
                    {children.map((folder) => (
                      <li
                        className="p-2 justify-between overflow-hidden flex items-center space-x-3 cursor-pointer hover:bg-DarkSecondary-100 rounded-xl"
                        key={folder.id}
                      >
                        <div className="flex gap-3">
                          {folder.type === "folder" ? (
                            <div className="flex gap-2">
                              <FiChevronRight className="w-6 h-6" />
                              <FiFolder className="w-6 h-6" />
                            </div>
                          ) : (
                            <FiFile className="w-6 h-6" />
                          )}
                          <p className="text-lg font-medium">{folder.name}</p>
                        </div>
                        <div>
                          <p className="text-lg font-medium">
                            {folder.modifiedTime
                              ? format(
                                  new Date(folder.modifiedTime),
                                  "MMMM d, yyyy"
                                )
                              : "-"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default Page;
