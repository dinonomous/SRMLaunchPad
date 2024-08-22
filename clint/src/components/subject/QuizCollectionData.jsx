import React from "react";
import {
    useQuizCollectionData,
  } from "../ApiCalles.jsx";
  import { Link } from "react-router-dom";

  const QuizCollectionData = ({ item, showcollection, onMouseLeave }) => {
    const { data, error, isLoading } = useQuizCollectionData(item);
    console.log(data);
  
    if (isLoading) {
      return <div>Loading...</div>;
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
                to={`/quizapi/${encodeURIComponent(item)}/${encodeURIComponent(
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

export default QuizCollectionData;
