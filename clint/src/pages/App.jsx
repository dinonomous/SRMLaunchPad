import React, { useState, useEffect } from "react";
import "../css/App.css";
import Rightpannel from "../components/Rightpannel";
import Video from "../components/Video";
import Pdf from "../components/pdf";
import Format from "../components/Format";
import { useParams } from "react-router-dom";
import layers from "../assets/icons8-layers-48.png";
import { useMediaQuery } from "react-responsive";

function extractDataURL(topic) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = topic;
  const dataURL = tempDiv
    .querySelector(".video-title")
    .getAttribute("data-url");
  return dataURL;
}

function App(props) {
  const [topicsArray, setTopicsArray] = useState([]);
  const [PDF, setPDF] = useState([]);
  const [Heading, setHeading] = useState("");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0); // State to track the currently selected topic index
  const { subject, unit } = useParams(); // Using useParams to extract dynamic parameters from the URL
  const [Notebool, SetNotebool] = useState(false);
  const [RightToglle, setRightToglle] = useState("0%");
  const [reader,setreader] = useState(false)

  const breakpoint = useMediaQuery({ query: "(max-width: 1200px)" });

  useEffect(() => {
    fetch(`http://10.3.21.237:5000/${subject}/${unit}`) // Using dynamic parameters for subject and unit
      .then((response) => response.json())
      .then((data) => {
        const { PDF, Heading, topicsHTML } = data;
        console.log("Data received from backend:", data);
        setTopicsArray(topicsHTML);
        setHeading(Heading);
        setPDF(PDF);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [subject, unit]); // Update useEffect dependency to fetch data when subject or unit changes

  const handleTopicClick = (index) => {
    setSelectedTopicIndex(index); // Update the selected topic index when a topic is clicked
  };

  const sideBarPlacement = () => {
    if (breakpoint === true||Notebool===true) {
      setRightToglle(RightToglle === "0%" ? "-100%" : "0%");
    }
  };

  useEffect(() => {
    if (Notebool === false || breakpoint === false) {
      setRightToglle("0%");
    }
  }, [Notebool, breakpoint]);

  const nextclick = ()=>{
    {selectedTopicIndex < topicsArray.length-1 && setSelectedTopicIndex(prevIndex => prevIndex + 1);}
  }

  const readermode = () =>{
    setreader(!reader)
  }

  console.log("Notebool value:", Notebool);

  return (
    <>
      <Format Notebool={Notebool} toggleNotebool={() => SetNotebool(!Notebool)}>
        {reader ? 
          (<>
            <Pdf PDF={PDF} onClick={readermode} reader={reader}/>
            <Video
                  url={
                    topicsArray.length > 0 ? extractDataURL(topicsArray[selectedTopicIndex]) : ""
                  }
                  next = {topicsArray[selectedTopicIndex +1 ]}
                  next_click = {nextclick}
                  next_bool = {selectedTopicIndex !== topicsArray.length-1}
                  reader = {reader}
                />
          </>) 

        : 
        
        (<div className={`container ${Notebool ? "half" : ""}`}>
          <div className={`container ${Notebool ? "halfside" : ""}`}>
            <span
              className={
                breakpoint === true && RightToglle === "0%"
                  ? "darkbackground"
                  : "normal"
              }
            >
              <main
                className="mainapp"
                style={{
                  display: "inline-block",
                  width: "100%",
                  zIndex: 10,
                  flexDirection: "column",
                  boxSizing: "border-box",
                  marginRight:
                    RightToglle === "100%" ? "50px" : "calc(20% + 2rem)",
                  marginLeft: "2rem",
                  color: "white",
                  position: "relative",
                  top: "1rem",
                }}
              >
                <div className="text">
                  <h2>{Heading}</h2>
                </div>
                <Video
                  url={
                    topicsArray.length > 0 ? extractDataURL(topicsArray[selectedTopicIndex]) : ""
                  }
                  next = {topicsArray[selectedTopicIndex +1 ]}
                  next_click = {nextclick}
                  next_bool = {selectedTopicIndex !== topicsArray.length-1}
                />
                <Pdf PDF={PDF} onClick={readermode}/>
              </main>
            </span>
            <Rightpannel
              topics={topicsArray}
              onTopicClick={handleTopicClick}
              fill={selectedTopicIndex}
              RightToglle={RightToglle}
              Notebool={Notebool}
              sideBarPlacement={sideBarPlacement}
            />
          </div>
          {Notebool && (
            <div>
              <iframe
                src="/Notes"
                frameborder="0"
                className="halfside right_note"
              ></iframe>
            </div>
          )}
        </div>)}
        
        {breakpoint === true || Notebool === true ? <span className="sidemenue_button"> <img src={layers} alt="" onClick={() => sideBarPlacement()} /></span>: null }
      </Format>
    </>
  );
}

export default App;
