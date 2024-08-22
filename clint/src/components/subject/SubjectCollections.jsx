import React, { useState } from "react";
import {
  useCollectionNames,
  useQuizCollectionNames,
  useCollectionData,
  useQuizCollectionData,
} from "../ApiCalles.jsx";
import { Link } from "react-router-dom";
import SubjectCollectionData from "./SubjectCollectionData.jsx";

const SubjectCollections = ({ admin }) => {
  const [showCollectionData, setShowCollectionData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (parameter) => {
    console.log(parameter);
    setSelectedItem(parameter);
    setShowCollectionData(true);
  };

  const { data, error, isLoading } = useCollectionNames();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="SubjectCollectionParent">
      <div className="SubjectCollectioncontainer">
        <div className="SubjectCollection">
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
            </li>
          ))}
          {admin && Subjects.length > 0 && (
            <li onClick={ShowAddSubjectForm} className="lisp custom-link">
              Add New Subject
            </li>
          )}
        </div>
        <div className="SubjectCollectionChild" style={{display: showCollectionData ? 'block' : 'none'}}>
          {showCollectionData && selectedItem && (
            <SubjectCollectionData item={selectedItem} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectCollections;
