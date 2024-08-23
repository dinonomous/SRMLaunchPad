import React, { useState } from "react";
import {
  useCollectionNames,
  useQuizCollectionNames,
  useCollectionData,
  useQuizCollectionData,
} from "../ApiCalles.jsx";
import { Link } from "react-router-dom";
import SubjectCollectionData from "./SubjectCollectionData.jsx";

const SubjectCollections = ({
  admin,
  showSubjects,
  onHideCollectionData, // Add this prop
}) => {

  const handleClick = (parameter) => {
    console.log(parameter);
    setSelectedItem(parameter);
    setShowCollectionData(true);
    setshowcollection(false)
  };

  const { data, error, isLoading } = useCollectionNames();

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ul
        className="SubjectCollection"
        style={{ display: showSubjects ? "block" : "none" }}
        onMouseLeave={() => onHideCollectionData()}
      >
        {data.map((item, i) => (
          <li
            className="custom-link"
            key={i}
            onMouseEnter={() => {
              handleClick(item);
            }}
            data-title={item}
          >
            {item}
            <SubjectCollectionData item={item} />
          </li>
        ))}
        {admin && Subjects.length > 0 && (
          <li onClick={ShowAddSubjectForm} className="lisp custom-link">
            Add New Subject
          </li>
        )}
      </ul>
    </>
  );
};

export default SubjectCollections;