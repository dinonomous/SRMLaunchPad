import React from "react";
import {
    useCollectionNames,
    useQuizCollectionNames,
    useCollectionData,
    useQuizCollectionData,
  } from "../ApiCalles.jsx";
  import { Link } from "react-router-dom";

const SubjectCollectionData = ({item}) => {

    const { data, error, isLoading } = useCollectionData(item);
    console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
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
    </div>
  );
};

export default SubjectCollectionData;
