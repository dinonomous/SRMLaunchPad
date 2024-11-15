import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FiChevronDown,
} from "react-icons/fi";

interface Item {
  title: string;
  id: string;
}

interface DropDownProps {
  dropdownTitle: string;
  data: {
    collectionName: string; // The name of the collection
    data: {
      title: string; // The title of the entry
      id: string; // The ID of the entry
    }[];
  }[];
}

const DropDown: React.FC<DropDownProps> = ({ dropdownTitle ,data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState<
    string | null
  >(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

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

  return (
    <li className="relative text-xl " ref={dropdownRef}>
      <button
        id="dropdownNavbarLink"
        onClick={toggleDropdown}
        className={`${
          isDropdownOpen ? "bg-DarkPrimary-300" : ""
        } rounded-full gap-2 px-5 mx-[-1rem] h-16 text-center flex items-center justify-between text-gray-900 hover:bg-gray-100 dark:focus:text-white dark:hover:bg-gray-700 dark:text-white md:dark:hover:bg-transparent`}
      >
        {dropdownTitle}
        <FiChevronDown widths={20}/>
      </button>

      <div
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } font-normal bg-white divide-y shadow-lg border dark:border-DarkSecondary-100 divide-gray-100 rounded-2xl w-64 dark:bg-DarkPrimary-200 dark:divide-DarkPrimary-300 absolute top-full my-4 left-[-100%]`}
      >
        <ul className="py-2 text-gray-700 dark:text-gray-200 text-xl rounded-2xl">
          {/* Render subjects */}
          {data.map((object) => (
            <li className="relative px-2" key={object.collectionName}>
              <button
                id="doubleDropdownButton"
                onMouseEnter={() => toggleDoubleDropdown(object.collectionName)}
                
                className="rounded-xl box-border flex text-start items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 dark:hover:text-white"
              >
                {object.collectionName}
                <div>
                <FiChevronDown />
                </div>
              </button>

              {/* Nested dropdown for subject items */}
              <div
                className={`z-10 ${
                  isDoubleDropdownOpen === object.collectionName ? "block" : "hidden"
                } bg-white divide-y shadow-lg border dark:border-DarkSecondary-100 divide-gray-100 shadow w-44 rounded-2xl dark:bg-DarkPrimary-200 px-2 absolute top-0 left-full mx-4`}
              >
                <ul className="py-2 text-lg text-gray-700 dark:text-gray-200" onMouseLeave={() => toggleDoubleDropdown(object.collectionName)}>
                  {object.data?.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-DarkPrimary-300 rounded-xl dark:hover:text-white"
                      
                    >
                      <Link href={`/programs/${object.collectionName}/${item.id}`}>
                        {item.title}
                      </Link>
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
