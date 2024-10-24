import React, { useState, useEffect } from "react";
import "../css/App.css";
import Rightpannel from "../components/subject/Rightpannel";
import Video from "../components/subject/Video";
import Pdf from "../components/subject/Pdf";
import Format from "../components/Format";
import { useParams } from "react-router-dom";
import layers from "../assets/icons8-layers-48.png";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
const apiUrl2 = import.meta.env.VITE_API_URL;
const apiFrontUrl = import.meta.env.VITE_API_FRONT_URL;
import axios from "axios";

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
  const navigate = useNavigate();

  const breakpoint = useMediaQuery({ query: "(max-width: 1200px)" });

  const encodedSubject = encodeURIComponent(subject);
  const encodedUnitId = encodeURIComponent(`${unit}`);
  const apiUrl = `${apiUrl2}/api/subjects/collection/${encodedSubject}/${encodedUnitId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true, // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { PDF, Heading, topicsHTML } = response.data;
          console.log("Data received from backend:", response.data);
          setTopicsArray(topicsHTML);
          setHeading(Heading);
          setPDF(PDF);
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Network error:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [apiUrl, navigate]);

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
  console.log(PDF)

  return (
    <>
      <Format Notebool={Notebool} toggleNotebool={() => SetNotebool(!Notebool)} breakpoint={breakpoint}>
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
        
        (<div className={`${Notebool ? "half" : ""}`} style={{width: "100%"}}>
          <div className={`custom_container ${Notebool ? "halfside" : ""}`}>
            <span>
              <main
                className="mainapp"
              >
                <Video
                  url={
                    topicsArray.length > 0 ? extractDataURL(topicsArray[selectedTopicIndex]) : ""
                  }
                  next = {topicsArray[selectedTopicIndex +1 ]}
                  next_click = {nextclick}
                  next_bool = {selectedTopicIndex !== topicsArray.length-1}
                />
                <Rightpannel
              topics={topicsArray}
              onTopicClick={handleTopicClick}
              fill={selectedTopicIndex}
              RightToglle={RightToglle}
              Notebool={Notebool}
              sideBarPlacement={sideBarPlacement}
            />
              </main>
            </span>
            {PDF.map((pdf) => (
                    <Pdf
                      PDF={pdf}
                      onClick={() => readermode(pdf)}
                    />
                  ))}
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
