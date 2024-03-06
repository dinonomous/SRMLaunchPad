import React, { useState, useEffect } from "react";
import Preview from "../components/Preview";
import "../css/App.css";
import Rightpannel from "../components/Rightpannel";
import Video from "../components/Video";
import Pdf from "../components/pdf";
import Format from "../components/Format";
import { useParams } from "react-router-dom";

function extractDataURL(topic) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = topic;
  const dataURL = tempDiv.querySelector('.video-title').getAttribute('data-url');
  return dataURL;
}

function App(props) {
  const [topicsArray, setTopicsArray] = useState([]);
  const [PDF, setPDF] = useState([]);
  const [Heading, setHeading] = useState("");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0); // State to track the currently selected topic index
  const { subject, unit } = useParams(); // Using useParams to extract dynamic parameters from the URL
  const [Notebool,SetNotebool] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/${subject}/${unit}`) // Using dynamic parameters for subject and unit
      .then(response => response.json())
      .then(data => {
        const { PDF, Heading, topicsHTML } = data;
        console.log("Data received from backend:", data);
        setTopicsArray(topicsHTML);
        setHeading(Heading);
        setPDF(PDF);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [subject, unit]); // Update useEffect dependency to fetch data when subject or unit changes

  const handleTopicClick = (index) => {
    setSelectedTopicIndex(index); // Update the selected topic index when a topic is clicked
  };

  console.log("Notebool value:", Notebool);

  return (
    <>
      <Format Notebool={Notebool} toggleNotebool={() => SetNotebool(!Notebool)}>
        <div className={`container ${Notebool ? 'half' : ''}`}>
        <div className={`container ${Notebool ? 'halfside' : ''}`}>
          <div className="backbround"></div>
          <main className="mainapp">
            <div className="text">
              <h2>{Heading}</h2>
            </div>
            <Video url={topicsArray.length > 0 ? extractDataURL(topicsArray[selectedTopicIndex]) : ''} />
            <div className="previewcontainer">
              <Preview />
              <Preview />
              <Preview />
            </div>
            <Pdf PDF={PDF} />
          </main>
          <Rightpannel topics={topicsArray} onTopicClick={handleTopicClick} fill={selectedTopicIndex} />
        </div>
        {Notebool && <div><iframe src="/Notes" frameborder="0" className="halfside right_note"></iframe></div>}
        </div>
      </Format>
    </>
  );
}

export default App;
