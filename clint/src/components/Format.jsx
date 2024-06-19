import React, { useRef, useState, useEffect } from "react";
import "../css/nav.css";
import "../css/navigation.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

function Format({ children, Notebool, toggleNotebool, breakpoint }) {
  // const mainRef = useRef(null);
  // const bellowRef = useRef(null);
  // const ulRef = useRef(null);
  // const childRef = useRef(null);

  const [parameter, setparameter] = useState();
  const [CollectionData, setCollectionData] = useState([]);
  const [CollectionDataQuiz, setCollectionDataQuiz] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [QuizSubjects, setQuizSubjects] = useState([]);
  const spanRef = useRef(null);
  const spanRefQuiz = useRef(null);

  useEffect(() => {
    // Using GSAP to animate margin-left from 100% to 0
    gsap.fromTo(
      spanRef.current,
      { marginLeft: "100%" },
      {
        marginLeft: "0",
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, [CollectionData, CollectionDataQuiz]);
  useEffect(() => {
    // Using GSAP to animate margin-left from 100% to 0
    gsap.fromTo(
      spanRefQuiz.current,
      { marginLeft: "100%" },
      {
        marginLeft: "0",
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, [CollectionData, CollectionDataQuiz]);

  function fetchData() {
    fetch("http://192.168.122.213:5000/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function fetchDataQuiz() {
    fetch("http://192.168.122.213:5000/api/quizapi/getcollectionnames")
      .then((response) => response.json())
      .then((data) => {
        const { collectionNames } = data;
        console.log("Data received from backend:", data);
        setQuizSubjects(data); // Corrected assignment
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  const handleMouseclick = () => {
    setSubjects([]);
    setQuizSubjects([]);
    fetchData();
  };

  useEffect(() => {
    setCollectionData([]);
    setCollectionDataQuiz([]);
  }, [Subjects]);
  useEffect(() => {
    setCollectionData([]);
    setCollectionDataQuiz([]);
  }, [QuizSubjects]);

  const handleMouseclickQuiz = () => {
    setSubjects([]);
    setQuizSubjects([]);
    fetchDataQuiz();
  };

  const handleClick = (parameter) => {
    console.log("Clicked with parameter:", parameter);
    fetch(`http://192.168.122.213:5000/${parameter}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setCollectionData(data.titles); // Set collection data
        console.log(data.titles);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleClickQuiz = (parameter) => {
    console.log("Clicked with parameter:", parameter);
    fetch(`http://192.168.122.213:5000/api/quizapi/Quizz/${parameter}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setCollectionDataQuiz(data.titles); // Set collection data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    // {!breakpoint &&
    //
    //   }
    <>
      {!breakpoint && (
        <nav className="navigation_menue">
          <div className="upper_nav_body">
            <span className="logo">
              <span className="imglogo">
                <div className="logo">
                  <svg
                    viewBox="0 0 350 173.69371586886075"
                    className="looka-1j8o68f"
                  >
                    <defs id="SvgjsDefs1013"></defs>
                    <g
                      id="SvgjsG1014"
                      featurekey="dsJevG-0"
                      transform="matrix(1.6447330713272095,0,0,1.6447330713272095,92.763186399703,-45.01634328755528)"
                      fill="#F8F4E3"
                    >
                      <title xmlns="http://www.w3.org/2000/svg">
                        collections_07
                      </title>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M91.56,70.65H87.91L78,57.18a1,1,0,0,0-1.66.07l-1.79,3L58.78,38.88V33.37h4.79a1,1,0,0,0,1-1v-4a1,1,0,0,0-1-1H57.78a1,1,0,0,0-1,1V38.88L46.52,52.65,42,46.15A1,1,0,0,0,42,46.08a1,1,0,0,0-.22-0.2l-0.14-.07a1,1,0,0,0-.26-0.07l-0.1,0H41.08a1,1,0,0,0-.32.11l-0.08,0a1,1,0,0,0-.24.21L29.17,60.41l-2.65-3.27a1.1,1.1,0,0,0-.79-0.37,1,1,0,0,0-.78.4L14.78,70.65H8.44a1,1,0,0,0,0,2h72a1,1,0,0,0,0-2H77L63.26,52.81A1,1,0,0,0,61.67,54L74.51,70.65H17.29L25.77,59.4l4.82,5.94a1,1,0,0,0,1.55-1.26L30.46,62,40.54,49.2,41.85,59a1,1,0,0,0,.2.48l4.48,5.8a1,1,0,1,0,1.58-1.22L43.8,58.52l-1-7.8L47,56.91a1,1,0,0,0,1.17.37L53,55.53l2.77,2.93a1,1,0,0,0,1.46-1.37L54,53.68a1,1,0,0,0-1.07-.25l-4.7,1.71-0.52-.75,5.23-7,2.91,0.3,1.43,2.74a1,1,0,0,0,1.36.42l4.62-2.49L73.84,62.6h0l2.57,3.47A1,1,0,1,0,78,64.89L75.85,62l1.44-2.39,8.13,11.08h-1a1,1,0,0,0,0,2h7.1A1,1,0,0,0,91.56,70.65ZM58.78,29.35h3.79v2H58.78v-2ZM58.6,48.57l-1.21-2.32a1,1,0,0,0-.78-0.53l-2.26-.23,3.43-4.6,4.3,5.81Z"
                      ></path>
                    </g>
                    <g
                      id="SvgjsG1015"
                      featurekey="0oZDye-0"
                      transform="matrix(4.2517008781433105,0,0,4.2517008781433105,-1.2755130471266183,68.97959019947177)"
                      fill="#F8F4E3"
                    >
                      <path d="M13.1 18.74 c0 0.5 0.38 0.64 1.42 0.74 l0 0.52 c-1.54 -0.06 -3.2 -0.06 -4.74 0 l0 -0.52 c1.04 -0.1 1.42 -0.24 1.42 -0.74 l0 -9.42 l-3.92 10.68 l-4.54 -10.72 l0 9.46 c0 0.5 0.58 0.62 1.84 0.74 l0 0.52 c-1.44 -0.06 -2.9 -0.06 -4.28 0 l0 -0.52 c1.24 -0.12 1.78 -0.24 1.78 -0.74 l0 -9.8 c0 -0.56 -0.54 -0.74 -1.58 -0.86 l0 -0.5 c1.16 0.06 2.32 0.06 3.48 0 l3.8 9.18 l3.38 -9.18 c1.06 0.06 2.24 0.06 3.32 0 l0 0.48 c-1 0.1 -1.38 0.24 -1.38 0.74 l0 9.94 z M17.16 8.1 c-0.52 0 -1 -0.44 -1 -1 c0 -0.52 0.48 -0.98 1 -0.98 c0.54 0 1 0.46 1 0.98 c0 0.56 -0.46 1 -1 1 z M18.240000000000002 18.74 c0 0.5 0.54 0.66 1.18 0.74 l0 0.52 c-1.4 -0.06 -2.78 -0.06 -4.18 0 l0 -0.52 c0.66 -0.08 1.18 -0.24 1.18 -0.74 l0 -6.92 c0 -0.66 -0.42 -0.84 -1.2 -0.8 l0 -0.52 c1.58 -0.22 2.22 -0.74 2.62 -0.74 c0.3 0 0.52 0.12 0.52 0.48 c0 0.52 -0.12 1.24 -0.12 2.48 l0 6.02 z M29.200000000000003 18.74 c0 0.5 0.54 0.66 1.2 0.74 l0 0.52 c-1.4 -0.06 -2.8 -0.06 -4.18 0 l0 -0.52 c0.64 -0.08 1.16 -0.24 1.16 -0.74 l0 -5.52 c0 -1.58 -0.3 -2.62 -1.4 -2.62 c-1.48 0 -2.62 1.54 -2.84 1.9 l0 6.24 c0 0.5 0.54 0.66 1.18 0.74 l0 0.52 c-1.38 -0.06 -2.78 -0.06 -4.18 0 l0 -0.52 c0.66 -0.08 1.18 -0.24 1.18 -0.74 l0 -6.8 c0 -0.68 -0.42 -0.86 -1.2 -0.76 l0 -0.52 c1.54 -0.24 2.22 -0.9 2.6 -0.9 c0.28 0 0.46 0.18 0.42 0.5 l-0.18 1.7 c0.38 -0.58 1.64 -2.16 3.48 -2.16 c1.66 0 2.76 0.68 2.76 3.42 l0 5.52 z M39.78 18.08 c0 0.68 0.4 0.82 1.18 0.74 l0 0.58 c-1.56 0.36 -2.12 0.84 -2.62 0.84 c-0.26 0 -0.42 -0.2 -0.4 -0.52 l0.18 -1.3 c-0.28 0.78 -1.12 1.78 -2.82 1.78 c-2.22 0 -4.22 -1.9 -4.22 -5.32 c0 -3.22 2.14 -5.06 4.2 -5.06 c1.38 0 2.12 0.72 2.66 1.38 l0 -2.76 c0 -0.68 -0.4 -0.84 -1.18 -0.74 l0 -0.6 c1.52 -0.24 2.2 -0.92 2.62 -0.92 c0.26 0 0.4 0.14 0.4 0.48 l0 11.42 z M35.800000000000004 19.62 c1.26 0 2.06 -1.2 2.14 -2.12 l0 -5.62 c-0.54 -0.74 -1.32 -1.52 -2.42 -1.52 c-1.58 0 -2.42 1.34 -2.42 4.16 c0 2.66 0.94 5.1 2.7 5.1 z M51.86000000000001 16.64 l0.68 0 c-0.46 1.76 -1.72 3.62 -4.68 3.62 c-3.4 0 -5.8 -2.84 -5.8 -6.54 c0 -3.68 2.28 -6.46 5.6 -6.46 c1.48 0 1.86 0.38 3.08 0.38 c0.2 0 0.32 0 0.6 -0.04 c0.22 1.14 0.5 2.18 1.04 3.4 l-0.92 0 c-0.82 -1.98 -2 -3.16 -4.16 -3.16 c-1.5 0 -3.2 1.28 -3.2 5.32 c0 3.8 1.6 6.42 3.96 6.42 c1.9 0 3.16 -0.94 3.8 -2.94 z M59.2 9.78 c1 0 1.6 0.48 1.6 1.08 c0 0.56 -0.34 0.96 -0.88 0.96 c-0.92 0 -0.76 -0.92 -1.72 -0.92 c-1.16 0 -1.7 1.54 -1.86 1.9 l0 5.94 c0 0.5 0.56 0.66 1.16 0.74 l0 0.52 c-1.4 -0.08 -2.76 -0.08 -4.16 0 l0 -0.52 c0.66 -0.08 1.2 -0.24 1.2 -0.74 l0 -6.78 c0 -0.68 -0.42 -0.86 -1.2 -0.76 l0 -0.52 c1.54 -0.24 2.18 -0.92 2.58 -0.92 c0.28 0 0.44 0.18 0.42 0.5 l-0.3 1.92 c0.68 -1.42 1.58 -2.4 3.16 -2.4 z M68.98 18.1 c0 0.68 0.4 0.82 1.18 0.74 l0 0.56 c-1.56 0.36 -2.1 0.84 -2.6 0.84 c-0.26 0 -0.42 -0.14 -0.4 -0.48 l0.1 -1.52 c-0.48 0.88 -1.48 2 -3.12 2 c-1.34 0 -2.92 -0.66 -2.92 -2.54 c0 -1.74 1.1 -3 5.94 -4.02 l0 -0.6 c0 -1.9 -0.02 -2.76 -1.12 -2.76 c-3.12 0 -1.64 2.98 -3.26 2.98 c-0.58 0 -0.86 -0.36 -0.86 -0.84 c0 -1.44 1.84 -2.66 4.14 -2.66 c2.36 0 2.92 0.84 2.92 3.28 l0 5.02 z M64.76 19.42 c1.32 0 2.14 -1.38 2.4 -2.02 l0 -3.16 c-3.68 0.82 -4 2.42 -4 3.36 c0 1.1 0.6 1.82 1.6 1.82 z M75.02000000000001 6.359999999999999 c1.22 0 2.34 0.76 2.34 1.64 c0 0.52 -0.14 0.86 -0.8 0.86 c-1.42 0 -0.3 -1.94 -1.42 -1.94 c-1.46 0 -1.38 1.68 -1.38 3.06 l2.18 0 c0.1 0 0.18 0.08 0.18 0.18 l0 0.24 c0 0.12 -0.08 0.18 -0.18 0.18 l-2.18 0 l0 8.16 c0 0.5 0.54 0.66 1.18 0.74 l0 0.52 c-1.4 -0.06 -2.78 -0.06 -4.18 0 l0 -0.52 c0.66 -0.08 1.18 -0.24 1.18 -0.74 l0 -8.16 l-0.9 0 c-0.1 0 -0.18 -0.06 -0.18 -0.18 l0 -0.24 c0 -0.1 0.08 -0.18 0.18 -0.18 l0.9 0 c0.04 -2.62 1.3 -3.62 3.08 -3.62 z M82.58 19.38 c-0.32 0.36 -1.02 0.76 -1.82 0.76 c-1.34 0 -2.32 -0.66 -2.32 -2.52 l0 -7.04 l-0.9 0 c-0.1 0 -0.18 -0.06 -0.18 -0.18 l0 -0.24 c0 -0.1 0.08 -0.18 0.18 -0.18 c1.24 0 1.76 -0.86 2.02 -2.72 l0.72 0 l0 2.72 l2.16 0 c0.1 0 0.18 0.08 0.18 0.18 l0 0.24 c0 0.12 -0.08 0.18 -0.18 0.18 l-2.16 0 l0 7.42 c0 0.72 0.2 1.4 1.02 1.4 c0.64 0 1.08 -0.42 1.28 -0.72 l0 0.7 z"></path>
                    </g>
                  </svg>
                </div>
              </span>
              <span className="logo_txt">React</span>
            </span>
            <span className="nav_options">
              <span className="nav_options_li">
                <ul>
                  <li>
                    {" "}
                    <Link to={`/`}>Home</Link>{" "}
                  </li>
                  <li onClick={handleMouseclick}>Subjects</li>
                  <li onClick={handleMouseclickQuiz}>Quiz</li>
                  <li>Notes</li>
                </ul>
              </span>
            </span>
          </div>
          <div className="bellow_nav_body">
            <span className="nav_sub_options">
              <span className="nav_suboptions_li">
                <span className="suboptions">
                  {Subjects && (
                    <ul>
                      {Subjects.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            {
                              handleClick(item);
                            }
                            setparameter(item);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {QuizSubjects && (
                    <ul>
                      {QuizSubjects.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            {
                              handleClickQuiz(item);
                            }
                            setparameter(item);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
                <span className="" id="suboptionSubjects" ref={spanRef}>
                  {CollectionData && (
                    
                      <ul>
                        {CollectionData.map(function (item, index) {
                          return (
                            <li key={index}>
                              <Link
                                to={`/${encodeURIComponent(
                                  parameter
                                )}/${encodeURIComponent(item)}`}
                              >
                                {item}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                  )}
                  {CollectionDataQuiz && (

                      <ul>
                        {CollectionDataQuiz.map(function (item, index) {
                          return (
                            <li key={index}>
                              <Link
                                to={`/quizapi/${encodeURIComponent(
                                  parameter
                                )}/${encodeURIComponent(item)}`}
                              >
                                {item}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                  )}
                </span>
              </span>
            </span>
          </div>
        </nav>
      )}
      <main Notebool={Notebool} className="main_body">
        {children}
      </main>
      <footer></footer>
    </>
  );
}

export default Format;
