import React from "react";
import {
  useCollectionNames,
  useQuizCollectionNames,
  useCollectionData,
  useQuizCollectionData,
} from "../ApiCalles.jsx";
import { Link } from "react-router-dom";

const SubjectCollections = () => {
  const { data, error, isLoading } = useCollectionNames();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {Subjects.map((item, i) => (
          <li
            className="custom-link"
            key={i}
            onClick={() => {
              handleClick(item);
              setparameter(item); // ensure this matches your actual state setter
            }}
            data-title={colapse ? item : undefined}
          >
            {colapse && (
              <div className="collapse-container">
                <p>*</p>
              </div>
            )}
            {!colapse && item}
          </li>
        ))}
        {admin && Subjects.length > 0 && (
          <li onClick={ShowAddSubjectForm} className="lisp custom-link">
            Add New Subject
          </li>
        )}
      </ul>
    </div>
  );
};

export default SubjectCollections;
