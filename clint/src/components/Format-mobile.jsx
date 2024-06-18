import React, { useRef, useState, useEffect } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";

function Format({ children, Notebool, toggleNotebool, breakpoint}) {
  const mainRef = useRef(null);
  const bellowRef = useRef(null);
  const ulRef = useRef(null);
  const childRef = useRef(null);
  const [Subjects, setSubjects] = useState([]);
  const [CollectionData, setCollectionData] = useState([]);
  const [parameter, setparameter] = useState();
  const [currentLink, setcurrentLink] = useState();


  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = (e) => {
    mainRef.current.style.height = "22rem";
    ulRef.current.style.marginLeft = "0";
    childRef.current.classList.add("blurred");
    setIsVisible(true);
    fetchData();
  };

  useEffect(()=>{setCollectionData([])},[Subjects])

  const handleMouseOut = (e) => {
    if (!mainRef.current.contains(e.relatedTarget)) {
      mainRef.current.style.height = "4rem";
      ulRef.current.style.marginLeft = "-500%";
      childRef.current.classList.remove("blurred");
      setIsVisible(false);
      setCollectionData([]);
    }
  };
  const handleMouseEnterQuiz = (e) => {
    mainRef.current.style.height = "22rem";
    ulRef.current.style.marginLeft = "0";
    childRef.current.classList.add("blurred");
    setIsVisible(true);
    fetchDataQuiz();
  };

  const fetchData = () => {
    fetch("http://192.168.0.135:5000/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchDataQuiz = () => {
    fetch("http://192.168.0.135:5000/api/quizapi/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleClick = (parameter) => {
    console.log("Clicked with parameter:", parameter);
    fetch(`http://192.168.0.135:5000/${parameter}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setCollectionData(data.titles); // Set collection data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleClickQuiz = (parameter) => {
    console.log("Clicked with parameter:", parameter);
    fetch(`http://192.168.0.135:5000/api/quizapi/Quizz/${parameter}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setCollectionData(data.titles); // Set collection data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
    <nav>
      <div className="upper_nav_body">
        <span className="logo">

        </span>
        <span className="nav_options">
          
        </span>
      </div>
      <div className="bellow_nav_body">
        <span className="nav_sub_options">

        </span>
      </div>
    </nav>
    </>
  );
}

export default Format;
