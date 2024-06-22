import React, { useState } from "react";
import Format from "../components/Format";
import SubjectForm from "../components/admin/subjectForm";
import "../css/admin.css";

const Admin = () => {
  const [addNewSubject, setAddNewSubject] = useState(false);

  const ShowAddSubjectForm = () => {
    setAddNewSubject(!addNewSubject);
  };

  return (
    <Format admin={true} ShowAddSubjectForm={ShowAddSubjectForm}>
      {addNewSubject && (
        <SubjectForm />
      )}
    </Format>
  );
};

export default Admin;
