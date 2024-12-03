import React, { useState } from "react";
import Wraper from "../Wraper";
import Navbar from "../nav/Navbar";
import { IoMenu } from "react-icons/io5";

interface WithSideNavProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const WithSideNav: React.FC<WithSideNavProps> = ({ sidebar, children }) => {
  // State to toggle the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Wraper>
      <Navbar />

      <aside
        id="default-sidebar"
        className={`fixed h-[calc(100vh-8rem)] z-40 w-96 pl-6 transition-transform shadow-md ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:mt-10`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar} // Trigger sidebar toggle
          aria-controls="default-sidebar"
          type="button"
          className="absolute right-4 top-4 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <IoMenu />
        </button>
        <div className="border-t-2 rounded-3xl border-t-DarkPrimary-300 h-full py-4 overflow-y-auto bg-gray-50 dark:bg-DarkPrimary-200 scrollbar-thin scrollbar-thumb-neutral-950 scrollbar-thumb-rounded scrollbar-track-transparent">
          {sidebar}
        </div>
      </aside>
      <main
        className={`bg-DarkPrimary-200 m-4 mt-4 md:mr-6 md:ml-[25rem] md:mt-10 rounded-3xl md:h-[calc(100vh-8rem)] overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-950 scrollbar-thumb-rounded scrollbar-track-transparent ${
          isSidebarOpen ? "blur-sm" : ""
        }`}
      >
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <IoMenu />
        </button>
        {children}
      </main>
    </Wraper>
  );
};

export default WithSideNav;
