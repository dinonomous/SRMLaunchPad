"use client";

import React, { useState, useEffect } from "react";

interface ProfileProps {
  DashboardOpen: number | null;
}

const Profile: React.FC<ProfileProps> = ({ DashboardOpen }) => {
  return (
    <>
      <div
        className={`absolute top-full right-0 z-50 w-fit ${
          DashboardOpen ? "" : "hidden"
        } w-[12rem] p-1 rounded-3xl my-4 list-none bg-white divide-y divide-gray-100 shadow dark:bg-DarkPrimary-200 dark:divide-gray-600 text-lg`}
        id="user-dropdown"
      >
        <div className="px-4 py-3 text-lg">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2 text-lg" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block text-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Profile;
