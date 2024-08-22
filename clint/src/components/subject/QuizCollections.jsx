import React from "react";
import {
  useQuizCollectionNames,
} from "../ApiCalles.jsx";
import QuizCollectionData from "./QuizCollectionData.jsx";

const QuizCollection = ({
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

  const { data, error, isLoading } = useQuizCollectionNames();

  if (isLoading) {
    return <div>Loading...</div>;
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
            <QuizCollectionData item={item} />
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

export default QuizCollection;