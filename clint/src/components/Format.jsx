import React, { useRef, useState, useEffect } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";

function Format({ children, Notebool, toggleNotebool }) {
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
    childRef.current.classList.add('blurred');
    setIsVisible(true);
    fetchData()
  };

  const handleMouseOut = (e) => {
    if (!mainRef.current.contains(e.relatedTarget)) {
      mainRef.current.style.height = "4rem";
      ulRef.current.style.marginLeft = "-500%";
      childRef.current.classList.remove('blurred');
      setIsVisible(false);
    }
  };
  const handleMouseEnterQuiz = (e) => {
    mainRef.current.style.height = "22rem";
    ulRef.current.style.marginLeft = "0";
    childRef.current.classList.add('blurred');
    setIsVisible(true);
    fetchDataQuiz();
  }

  const fetchData = () => {
    fetch("http://localhost:5000/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchDataQuiz = () => {
    fetch("http://localhost:5000/api/quizapi/getcollectionnames")
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
          <div className="links">
            <ul className="ul_links">
              <li><Link to="/">Home</Link></li>
              <li className="subject_li" onMouseEnter={handleMouseEnter}><Link to="#">Subjects</Link></li>
              <li onMouseEnter={handleMouseEnterQuiz}><Link to="#">Quiz</Link></li>
              <li><Link to="#">Chat</Link></li>
              <li><Link to="#" onClick={toggleNotebool}>Notes</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={`subjects row ${isVisible ? '' : 'hidden'}`} ref={bellowRef} onMouseOut={handleMouseOut}>
          <div className="column" ref={ulRef}>
            {Subjects.map(function (item, i) {
              return (
                <div key={i} className="anhors">
                  <Link
                    to={item.trim().toLowerCase().startsWith("quiz") ? "" : `/${item}/Unit 1`}
                    onMouseEnter={() => {
                      handleClick(item);
                      setparameter(item);
                    }}
                    onClick={() => setcurrentLink(item.startsWith("quiz") ? "" : `/${item}/Unit 1`)}
                  >
                    {item}
                  </Link>
                </div>
              );
            })}
          </div>
          {CollectionData.length>0 && <div className="column" ref={ulRef} style={{ marginLeft: 0 }}>
            {CollectionData.map(function(CollectionData, index){
              return (
                <div key={index} className="anhors">
  <Link
    to={
      CollectionData.trim().toLowerCase().startsWith("quiz")
        ? `/quizapi/${encodeURIComponent(parameter)}/${encodeURIComponent(CollectionData)}`
        : currentLink && currentLink.includes(parameter)
        ? `/${encodeURIComponent(CollectionData)}`
        : `/${encodeURIComponent(parameter)}/${encodeURIComponent(CollectionData)}`
    }
  >
    {CollectionData}
  </Link>
</div>

              );
            })}
          </div>}
        </div>

      </nav>
      <main Notebool={Notebool} ref={childRef} className="main_body">{children}</main>
      <footer></footer>
    </>
  );
}

export default Format;
