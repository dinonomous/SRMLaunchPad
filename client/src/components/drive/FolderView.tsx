"use client";

import React from "react";
import DocumentViewer from "@/components/DocumentViewer";
import { FiChevronRight, FiFile, FiFolder } from "react-icons/fi";
import { format } from "date-fns";

interface Folder {
  name: string;
  id: string;
  type: string;
  modifiedTime: string;
}

interface FolderViewerProps {
  fileName: string | null;
  openFile: string | null;
  children: Folder[];
  toggleFile: (folderId: string, name: string) => void;
}

const FolderViewer: React.FC<FolderViewerProps> = ({
  fileName,
  openFile,
  children,
  toggleFile,
}) => {
  return (
    <div className="w-3/4 h-[80vh] dark:border-white">
      <div className="h-full">
        {fileName ? (
          <div className="h-[3vh] px-2">
            <h1 className="text-2xl font-normal">{fileName}</h1>
          </div>
        ) : null}

        <div className="h-[80vh]">
          {openFile ? (
            <DocumentViewer documentId={openFile} height={null} />
          ) : (
            <div className="bg-DarkPrimary-200 h-[82vh] py-4 px-2 w-full rounded-2xl overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-950 scrollbar-thumb-rounded scrollbar-track-transparent">
              <ul>
                {children.map((folder) => (
                  <li
                    className="p-2 justify-between overflow-hidden flex items-center space-x-3 cursor-pointer hover:bg-DarkSecondary-100 rounded-xl"
                    key={folder.id}
                    onClick={() =>
                      folder.type === "folder"
                        ? null
                        : toggleFile(folder.id, folder.name)
                    }
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
  );
};

export default FolderViewer;
