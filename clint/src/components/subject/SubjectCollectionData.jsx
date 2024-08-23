import React from "react";
import {
    useCollectionData,
  } from "../ApiCalles.jsx";
  import { Link } from "react-router-dom";

  const SubjectCollectionData = ({ item, showcollection, onMouseLeave }) => {
    const { data, error, isLoading } = useCollectionData(item);
    console.log(data);
  
    if (isLoading) {
      return <div className="spinner"></div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <>
        <ul
          onMouseLeave={onMouseLeave} // Add the event handler here
        >
          {data.map((items, index) => (
            <li
              key={index}
              data-id={items.id}
            >
              <Link
                className="custom-link"
                to={`/${encodeURIComponent(item)}/${encodeURIComponent(
                  items.id
                )}`}
              >
                {items.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };

export default SubjectCollectionData;
