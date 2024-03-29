import React, { useRef, useState, useEffect } from "react";
import "../css/nav.css";
import logo from "../assets/image-removebg-preview(1).png";
import { Link } from "react-router-dom";


// Now you can use Rightpannel component and margin state variable and sideBarPlacement function here

function Format({ children, Notebool, toggleNotebool }) {
  const mainRef = useRef(null);
  const bellowRef = useRef(null);
  const lineRef = useRef(null);
  const ulRef = useRef(null);
  const [Subjects, setSubjects] = useState([]);
  const [CollectionData, setCollectionData] = useState([]);
  const [parameter, setparameter] = useState();
  const [currentLink, setcurrentLink] = useState();

  const handleMouseEnter = (e) => {
    mainRef.current.style.height = "14rem";
    bellowRef.current.style.display = "flex";
    lineRef.current.style.top = "10rem";
    ulRef.current.style.marginLeft = "0";
  };

  const handleMouseOut = (e) => {
    if (!mainRef.current.contains(e.relatedTarget)) {
      mainRef.current.style.height = "4rem";
      bellowRef.current.style.display = "none";
      lineRef.current.style.top = "0";
      ulRef.current.style.marginLeft = "-500%";
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (parameter) => {
    console.log("Clicked with parameter:", parameter);
    fetch(`http://localhost:5000/${parameter}`)
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
      <nav className="main_nav" ref={mainRef} onMouseOut={handleMouseOut}>
        <div className="contente">
          <div className="main_logo">
            <img src={logo} alt="" />
            <span>SRMLaunchPad</span>
          </div>
          <div className="links">
            <ul className="ul_links">
              <li><Link to="/">Home</Link></li>
              <li className="subject_li" onMouseEnter={handleMouseEnter}><Link to="#">Subjects</Link></li>
              {/* Add dropdown functionality here */}
              <li><Link to="#">Quiz</Link></li>
              <li><Link to="#">Chat</Link></li>
              <li><Link to="#" onClick={toggleNotebool}>Notes</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="subjects row" ref={bellowRef}>
          <div className="column" ref={ulRef}>
            {Subjects.map(function (item, i) {
              return (
                <div key={i} className="anhors">
                  <Link
                    to={"/" + item + "/Unit 1"}
                    onMouseEnter={() => {
                      handleClick(item);
                      setparameter(item);
                    }}
                    onClick={() => setcurrentLink("/" + item + "/Unit 1")}
                  >
                    {item}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="column" ref={ulRef}>
            {CollectionData.map(function(CollectionData, index){
              return (
                <div key={index} className="anhors">
                  <Link
                    to={currentLink && currentLink.includes(parameter) ? `/${CollectionData}` : `/${parameter}/${CollectionData}`}
                  >
                    {CollectionData}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="line" ref={lineRef}></div>
      </nav>
      <main Notebool={Notebool}>{children}</main>
      <footer></footer>
    </>
  );
}

export default Format;
