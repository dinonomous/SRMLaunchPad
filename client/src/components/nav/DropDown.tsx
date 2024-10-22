import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiFolder,
} from "react-icons/fi";

interface Item {
  title: string;
  id: string;
}

interface DropDownProps {
  data: {
    subject?: Record<string, Item[]>;
    quiz?: Record<string, Item[]>;
  } | null;
}

const DropDown: React.FC<DropDownProps> = ({ data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState<
    string | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDoubleDropdown = (key: string) => {
    setIsDoubleDropdownOpen(isDoubleDropdownOpen === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsDoubleDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const subjects = data.subject ? Object.keys(data.subject) : [];
  const quizzes = data.quiz ? Object.keys(data.quiz) : [];

  return (
    <li className="relative text-xl " ref={dropdownRef}>
      <button
        id="dropdownNavbarLink"
        onClick={toggleDropdown}
        className={`${
          isDropdownOpen ? "bg-DarkPrimary-300" : ""
        } rounded-full gap-2 px-5 mx-[-1rem] h-16 text-center flex items-center justify-between text-gray-900 hover:bg-gray-100 dark:focus:text-white dark:hover:bg-gray-700 dark:text-white md:dark:hover:bg-transparent`}
      >
        {Object.keys(data).join(", ")}
        <FiChevronDown widths={20}/>
      </button>

      <div
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } font-normal bg-white divide-y shadow-lg border dark:border-DarkSecondary-100 divide-gray-100 rounded-2xl w-64 dark:bg-DarkPrimary-200 dark:divide-DarkPrimary-300 absolute top-full my-4 left-[-100%]`}
      >
        <ul className="py-2 text-gray-700 dark:text-gray-200 text-xl rounded-2xl">
          {/* Render subjects */}
          {subjects.map((subject) => (
            <li className="relative px-2" key={subject}>
              <button
                id="doubleDropdownButton"
                onMouseEnter={() => toggleDoubleDropdown(subject)}
                
                className="rounded-xl box-border flex text-start items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:hover:text-white"
              >
                {subject}
                <div>
                <FiChevronDown />
                </div>
              </button>

              {/* Nested dropdown for subject items */}
              <div
                className={`z-10 ${
                  isDoubleDropdownOpen === subject ? "block" : "hidden"
                } bg-white divide-y shadow-lg border dark:border-DarkSecondary-100 divide-gray-100 shadow w-44 rounded-2xl dark:bg-DarkPrimary-200 px-2 absolute top-0 left-full mx-4`}
              >
                <ul className="py-2 text-lg text-gray-700 dark:text-gray-200" onMouseLeave={() => toggleDoubleDropdown(subject)}>
                  {data.subject[subject]?.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 rounded-xl dark:hover:text-white"
                      
                    >
                      <Link href={`/programs/${subject}/${item.id}`}>
                        {item.title}
                      </Link>
                    </li>
                  )) || <li className="px-4 py-2">No items available</li>}
                </ul>
              </div>
            </li>
          ))}
          {/* Render quizzes */}
          {quizzes.map((quiz) => (
            <li className="relative" key={quiz}>
              <button
                id="doubleDropdownButton"
                onClick={() => toggleDoubleDropdown(quiz)}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {quiz}
                <FiChevronDown />
              </button>
              <div
                className={`z-10 ${
                  isDoubleDropdownOpen === quiz ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-0 left-full mx-4`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {data.quiz[quiz]?.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.title}
                    </li>
                  )) || <li className="px-4 py-2">No items available</li>}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropDown;
