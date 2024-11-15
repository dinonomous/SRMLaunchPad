"use client";

import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import { useQuery } from "@tanstack/react-query";
import { getCollectionNames } from "@/utils/api";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import Profile from "./Profile";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutButton from "../auth/Logout";

const Navbar: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["collection"],
    queryFn: getCollectionNames,
  });

  const [logedin, setLogedin] = useState<boolean | null>(null);
  const [DashboardOpen, setDahboardopen] = useState<number | null>(null);

  function dashboardEvent() {
    if (DashboardOpen === null) {
      setDahboardopen(1);
    } else {
      setDahboardopen(null);
    }
  }

  useEffect(() => {
    const uid = Cookies.get("uid");
    console.log(uid);
    if (uid) {
      setLogedin(true);
    }
  }, []);

  if (isLoading)
    return (
      <nav className="z-50 bg-white dark:bg-DarkPrimary-200 border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 rounded-full m-6 h-20 flex justify-between items-center">
        <div className="flex flex-wrap items-center justify-between mx-auto h-16 border-white w-full px-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-48">
              <svg
                viewBox="60 0 309.6551724137931 60.344834026370364"
                className="looka-1j8o68f"
              >
                <g
                  id="SvgjsG1185"
                  transform="matrix(1.9159621458622618,0,0,1.9159621458622618,78.08403876773968,6.765059387241363)"
                  fill="#260F26"
                  className="dark:fill-slate-50"
                >
                  <path d="M11.9 14.5 c0.06 0.14 0.54 1.5 -0.08 2.92 c-0.72 1.7 -2.74 2.76 -5.26 2.78 c-2.18 0 -4.16 -0.96 -5.56 -2.48 l1.48 -1.48 c0.7 1.24 2.48 2.12 4.08 2.12 c1.74 -0.02 2.76 -0.66 3.18 -1.66 c0.32 -0.74 0.06 -1.54 0.04 -1.56 c-0.42 -1.16 -1.58 -1.42 -3.22 -1.92 c-1.86 -0.56 -4 -1.02 -4.7 -2.98 c-0.38 -1.02 -0.28 -2.2 0.24 -3.16 c1.16 -2.2 4.12 -2.26 4.46 -2.26 c2.2 0 4.16 0.96 5.56 2.5 l-1.46 1.46 c-0.82 -1.2 -2.42 -2.12 -4.1 -2.12 c-0.02 0 -1.78 0 -2.46 1.28 c-0.26 0.5 -0.32 1.16 -0.14 1.68 c0.4 1.1 1.54 1.36 3.14 1.84 c1.9 0.58 4.04 1.02 4.8 3.04 z M26.26 10.32 c0 2.28 -1.32 4.12 -3.22 4.92 l3.22 4.76 l-2.46 0 l-2.94 -4.36 l-3.5 0 l0 4.36 l-2.22 0 l0 -4.36 l0 -1.84 l0 -6.96 l0 -1.84 l2.22 0 l3.6 0 c2.94 0.02 5.3 2.3 5.3 5.32 z M17.36 6.84 l0 6.96 l3.58 0 c1.7 0 3.1 -1.44 3.1 -3.48 c0 -2.02 -1.4 -3.48 -3.1 -3.48 l-3.58 0 z M46 5 l0.32 0 l0 15 l-2.22 0 l0 -11.26 l-5.78 11.26 l-1.26 0 l-5.78 -11.26 l0 11.26 l-2.22 0 l0 -15 l0.3 0 l2.38 0 l5.94 11.6 l5.94 -11.6 l2.38 0 z M51.74 18.16 l7.56 0 l0 1.84 l-9.78 0 l0 -15 l2.22 0 l0 13.16 z M65.52000000000001 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M67.44000000000001 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M71.84 15.82 l0 -5.7 l2.06 0 l0 5.5 c0 2 0.62 2.88 2.32 2.88 c1.92 0 2.7 -1.34 2.7 -3.08 l0 -5.3 l2.06 0 l0 9.88 l-2.06 0 l0 -1.6 c-0.28 0.88 -1.52 1.68 -2.7 1.76 c-2.68 0.2 -4.38 -1.1 -4.38 -4.34 z M92.92 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -9.88 l2.06 0 l0 1.6 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M102.55999999999999 17.42 l1.42 1.28 c-0.94 1.04 -2.28 1.5 -3.78 1.5 c-2.84 0 -5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 c1.5 0 2.84 0.46 3.78 1.5 l-1.42 1.28 c-0.58 -0.78 -1.42 -1.08 -2.36 -1.08 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 c0.94 0 1.78 -0.3 2.36 -1.1 z M115.32 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -15 l2.06 0 l0 6.72 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M129.64 10.52 c0 3.04 -2.36 5.5 -5.28 5.52 l-3.6 0 l0 3.96 l-2.24 0 l0 -15 l5.84 0 c2.92 0.02 5.28 2.48 5.28 5.52 z M124.32 14.2 c1.72 0 3.1 -1.66 3.1 -3.68 s-1.38 -3.68 -3.1 -3.68 l-3.56 0 l0 7.36 l3.56 0 z M136.26 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M138.18 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M142.32000000000002 15.08 c0 -2.94 2.1 -5.14 4.94 -5.14 c0.98 0 2.18 0.42 2.84 0.96 l0 -5.9 l2.08 0 l0 15 l-2.08 0 l0 -0.74 c-0.78 0.58 -1.86 0.94 -2.84 0.94 c-2.84 0 -4.94 -2.18 -4.94 -5.12 z M144.4 15.08 c0 2 1.38 3.44 3.06 3.44 c1.12 0 2.12 -0.52 2.64 -1.58 c0.28 -0.54 0.44 -1.18 0.44 -1.86 s-0.16 -1.32 -0.44 -1.88 c-0.52 -1.06 -1.52 -1.56 -2.64 -1.56 c-1.68 0 -3.06 1.42 -3.06 3.44 z"></path>
                </g>
              </svg>
            </div>
          </Link>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex items-center flex-col font-medium text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0   md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="flex">
                <CircularProgress size="25px" />
                <Link
                  href="#"
                  className="block ml-3 py-2 px-3 text-white rounded md:bg-transparent md:p-0   md:dark:bg-transparent"
                  aria-current="page"
                >
                  Subjects
                </Link>
              </li>
              <li className="flex">
                <CircularProgress size="25px" />
                <Link
                  href="#"
                  className="block ml-3 py-2 px-3 text-white rounded md:bg-transparent md:p-0   md:dark:bg-transparent"
                  aria-current="page"
                >
                  quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/books/g"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  books
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-fit h-full flex relative">
            <Skeleton
              sx={{ bgcolor: "gray" }}
              variant="rounded"
              width={100}
              height={60}
              className="text-lg h-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full px-8 py-2.5 me-2 mb-2 dark:bg-[#235789] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            />
            <Skeleton
              sx={{ bgcolor: "gray" }}
              variant="circular"
              width={60}
              height={60}
            />
          </div>
        </div>
      </nav>
    );
  if (error) return <div>Error loading data</div>;

  return (
    <nav className="z-50 bg-white dark:bg-DarkPrimary-200 border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 rounded-full m-6 h-20 flex justify-between items-center">
      <div className="flex flex-wrap items-center justify-between mx-auto h-16 border-white w-full px-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="w-48">
            <svg
              viewBox="60 0 309.6551724137931 60.344834026370364"
              className="looka-1j8o68f"
            >
              <g
                id="SvgjsG1185"
                transform="matrix(1.9159621458622618,0,0,1.9159621458622618,78.08403876773968,6.765059387241363)"
                fill="#260F26"
                className="dark:fill-slate-50"
              >
                <path d="M11.9 14.5 c0.06 0.14 0.54 1.5 -0.08 2.92 c-0.72 1.7 -2.74 2.76 -5.26 2.78 c-2.18 0 -4.16 -0.96 -5.56 -2.48 l1.48 -1.48 c0.7 1.24 2.48 2.12 4.08 2.12 c1.74 -0.02 2.76 -0.66 3.18 -1.66 c0.32 -0.74 0.06 -1.54 0.04 -1.56 c-0.42 -1.16 -1.58 -1.42 -3.22 -1.92 c-1.86 -0.56 -4 -1.02 -4.7 -2.98 c-0.38 -1.02 -0.28 -2.2 0.24 -3.16 c1.16 -2.2 4.12 -2.26 4.46 -2.26 c2.2 0 4.16 0.96 5.56 2.5 l-1.46 1.46 c-0.82 -1.2 -2.42 -2.12 -4.1 -2.12 c-0.02 0 -1.78 0 -2.46 1.28 c-0.26 0.5 -0.32 1.16 -0.14 1.68 c0.4 1.1 1.54 1.36 3.14 1.84 c1.9 0.58 4.04 1.02 4.8 3.04 z M26.26 10.32 c0 2.28 -1.32 4.12 -3.22 4.92 l3.22 4.76 l-2.46 0 l-2.94 -4.36 l-3.5 0 l0 4.36 l-2.22 0 l0 -4.36 l0 -1.84 l0 -6.96 l0 -1.84 l2.22 0 l3.6 0 c2.94 0.02 5.3 2.3 5.3 5.32 z M17.36 6.84 l0 6.96 l3.58 0 c1.7 0 3.1 -1.44 3.1 -3.48 c0 -2.02 -1.4 -3.48 -3.1 -3.48 l-3.58 0 z M46 5 l0.32 0 l0 15 l-2.22 0 l0 -11.26 l-5.78 11.26 l-1.26 0 l-5.78 -11.26 l0 11.26 l-2.22 0 l0 -15 l0.3 0 l2.38 0 l5.94 11.6 l5.94 -11.6 l2.38 0 z M51.74 18.16 l7.56 0 l0 1.84 l-9.78 0 l0 -15 l2.22 0 l0 13.16 z M65.52000000000001 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M67.44000000000001 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M71.84 15.82 l0 -5.7 l2.06 0 l0 5.5 c0 2 0.62 2.88 2.32 2.88 c1.92 0 2.7 -1.34 2.7 -3.08 l0 -5.3 l2.06 0 l0 9.88 l-2.06 0 l0 -1.6 c-0.28 0.88 -1.52 1.68 -2.7 1.76 c-2.68 0.2 -4.38 -1.1 -4.38 -4.34 z M92.92 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -9.88 l2.06 0 l0 1.6 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M102.55999999999999 17.42 l1.42 1.28 c-0.94 1.04 -2.28 1.5 -3.78 1.5 c-2.84 0 -5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 c1.5 0 2.84 0.46 3.78 1.5 l-1.42 1.28 c-0.58 -0.78 -1.42 -1.08 -2.36 -1.08 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 c0.94 0 1.78 -0.3 2.36 -1.1 z M115.32 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -15 l2.06 0 l0 6.72 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M129.64 10.52 c0 3.04 -2.36 5.5 -5.28 5.52 l-3.6 0 l0 3.96 l-2.24 0 l0 -15 l5.84 0 c2.92 0.02 5.28 2.48 5.28 5.52 z M124.32 14.2 c1.72 0 3.1 -1.66 3.1 -3.68 s-1.38 -3.68 -3.1 -3.68 l-3.56 0 l0 7.36 l3.56 0 z M136.26 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M138.18 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M142.32000000000002 15.08 c0 -2.94 2.1 -5.14 4.94 -5.14 c0.98 0 2.18 0.42 2.84 0.96 l0 -5.9 l2.08 0 l0 15 l-2.08 0 l0 -0.74 c-0.78 0.58 -1.86 0.94 -2.84 0.94 c-2.84 0 -4.94 -2.18 -4.94 -5.12 z M144.4 15.08 c0 2 1.38 3.44 3.06 3.44 c1.12 0 2.12 -0.52 2.64 -1.58 c0.28 -0.54 0.44 -1.18 0.44 -1.86 s-0.16 -1.32 -0.44 -1.88 c-0.52 -1.06 -1.52 -1.56 -2.64 -1.56 c-1.68 0 -3.06 1.42 -3.06 3.44 z"></path>
              </g>
            </svg>
          </div>
        </Link>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex items-center flex-col font-medium text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0   md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
                <DropDown dropdownTitle={"Subject"} data={data.data.subjects} />
                <DropDown dropdownTitle={"Quiz"} data={data.data.quizzes} />
            <li>
              <Link
                href="/books/g"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                books
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {logedin ? (
          <div className="w-fit h-full flex relative">
            <LogoutButton />
            <button
              type="button"
              className="flex p-4 border border-DarkSecondary-300 h-full w-16 text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={dashboardEvent}
            >
              <span className="sr-only">Open user menu</span>
              <FaUser className="h-full w-full" />
            </button>
            <Profile DashboardOpen={DashboardOpen} />
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-fit h-full">
            <Link href="/signup/user">
              <button
                type="button"
                className="text-lg h-full text-gray-900 rounded-xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium px-8 py-2.5 me-2 mb-2 dark:bg-emerald-500 dark:text-DarkPrimary-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Sign up
              </button>
            </Link>
            <Link href="/login/user">
              <button
                type="button"
                className="text-lg h-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full px-8 py-2.5 me-2 mb-2 dark:bg-[#235789] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
