import React, { useState, useEffect } from "react";
import Format from "../components/Format";
import SubjectForm from "../components/admin/subjectForm";
import QuizForm from "../components/admin/QuizForm";
import "../css/admin.css";
import plus from '../assets/svg/plus.svg';
import trash from '../assets/svg/trash.svg';
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [addNewSubject, setAddNewSubject] = useState(false);
  const [addNewQuiz, setAddNewQuiz] = useState(false);
  const [CollectionData, setCollectionData] = useState([]);
  const [CollectionDataQuiz, setCollectionDataQuiz] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [QuizSubjects, setQuizSubjects] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
const apiFrontUrl = import.meta.env.VITE_API_FRONT_URL;
const navigate = useNavigate();


  useEffect(() => {
    fetchData()
  }, [])


  function fetchData() {

    setSubjects([]);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      navigate("/login");
      return;
    }
    fetch(`${apiUrl}/api/subjects/getcollectionnames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => {
        console.error("Error fetching data:", error), navigate("/login");
      });
  }

  async function deleteItem(e) {
    const token = localStorage.getItem("token");
  
    // Prompt the admin to confirm deletion by typing the collection name
    const confirmation = prompt(`Please type "${e}" to confirm deletion  "deleted subject will be stored in trash for future retreval please contact admin to retreve it" :`);
  
    // Check if the typed confirmation matches the expected value
    if (confirmation !== e) {
      alert("Deletion cancelled. The typed confirmation did not match.");
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/api/admin/subjects/collection/${e}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      alert("Collection deleted successfully.");
      fetchData()
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert("There was a problem with the deletion operation.");
    }
  }
  

  function fetchDataQuiz() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      navigate("/login");
      return;
    }
    fetch(`${apiUrl}/api/quizapi/getcollectionnames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setQuizSubjects(data); // Corrected assignment
      })
      .catch((error) => {
        console.error("Error fetching data:", error), navigate("/login");
      });
  }

  useEffect(() => {
    setCollectionData([]);
    setCollectionDataQuiz([]);
  }, [Subjects]);
  useEffect(() => {
    setCollectionData([]);
    setCollectionDataQuiz([]);
  }, [QuizSubjects]);

  const ShowAddSubjectForm = () => {
    setAddNewSubject(!addNewSubject);
  };
  const showAddQuizForm = () => {
    setAddNewQuiz(!addNewQuiz)
  }

  

  return (
    <Format admin={true} ShowAddSubjectForm={ShowAddSubjectForm} showAddQuizForm={showAddQuizForm}>
      <span style={{width: "100%"}}>
      {addNewSubject && (
        <SubjectForm />
        
      )}
      {addNewQuiz && (
        <QuizForm />
      )}
      <div className="admin_controllpannel">
        <div className="subject_controllpannel">
          <div className="subject_controllpannel_card">
            <h2>Add Subjects</h2>
            <div className="add" onClick={()=>{ShowAddSubjectForm()}}>
              <img src={plus} alt="" srcset="" />
              <h2>Add Subjects</h2>
            </div>
          </div>
          <div className="subject_controllpannel_card">
            <h2>Update Subjects</h2>
            <div className="update">
            {Subjects && (
                    <ul>
                      {Subjects.map((item, i) => (
                        <li
                        className="custom-link"
                        key={i}
                        onClick={() => {
                          handleClick(item);
                          setparameter(item);  // ensure this matches your actual state setter
                        }}
                      >
                         {item}
                         
                      </li>
                      ))}
                    </ul>
                  )}
            </div>
          </div>
          <div className="subject_controllpannel_card">
            <h2>Delete Subjects</h2>
            <div className="delete">
            {Subjects && (
                    <ul>
                      {Subjects.map((item, i) => (
                        <li
                        className="custom-link"
                        key={i}
                        onClick={() => {
                          deleteItem(item)  // ensure this matches your actual state setter
                        }}
                      >
                         {item}
                         <div className="deleteimgparent">
                          <img src={trash} alt="trash" srcset="" />
                          <p>delete</p>
                         </div>
                         
                      </li>
                      ))}
                    </ul>
                  )}
            </div>
          </div>
        </div>
        <div className="quiz_controllpannel">
        <div className="quiz_controllpannel_card">
            <h2>Add Subjects</h2>
            <div className="add">
              <img src={plus} alt="" srcset="" />
              <h2>Add Quiz</h2>
            </div>
          </div>
          <div className="quiz_controllpannel_card">
            <h2>Update Subjects</h2>
          </div>
          <div className="quiz_controllpannel_card">
            <h2>Delete Subjects</h2>
          </div>
        </div>
      </div>
      </span>
    </Format>
  );
};

export default Admin;
