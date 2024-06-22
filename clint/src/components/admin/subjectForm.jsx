import React, { useState } from "react";

const SubjectForm = () => {
  const [subjectName, setSubjectName] = useState("");
  const [units, setUnits] = useState([
    {
      title: "",
      videos: [{ title: "", url: "" }],
      PDF: [{ name: "", path: "" }],
    },
  ]);

  const addUnit = () => {
    setUnits([
      ...units,
      {
        title: "",
        videos: [{ title: "", url: "" }],
        PDF: [{ name: "", path: "" }],
      },
    ]);
  };

  const addVideoEntry = (unitIndex) => {
    const newUnits = [...units];
    newUnits[unitIndex].videos.push({ title: "", url: "" });
    setUnits(newUnits);
  };

  const addPDFEntry = (unitIndex) => {
    const newUnits = [...units];
    newUnits[unitIndex].PDF.push({ name: "", path: "" });
    setUnits(newUnits);
  };

  const handleUnitChange = (unitIndex, field, value) => {
    const newUnits = [...units];
    newUnits[unitIndex][field] = value;
    setUnits(newUnits);
  };

  const handleVideoChange = (unitIndex, videoIndex, field, value) => {
    const newUnits = [...units];
    newUnits[unitIndex].videos[videoIndex][field] = value;
    setUnits(newUnits);
  };

  const handlePDFChange = (unitIndex, pdfIndex, field, value) => {
    const newUnits = [...units];
    newUnits[unitIndex].PDF[pdfIndex][field] = value;
    setUnits(newUnits);
  };

  const submitForm = () => {
    if (!subjectName) {
      alert("Please fill in the subject name");
      return;
    }

    for (let unit of units) {
      if (!unit.title) {
        alert("Please fill in all unit titles");
        return;
      }

      for (let video of unit.videos) {
        if (!video.title || !video.url) {
          alert("Please fill in all video details");
          return;
        }
      }

      for (let pdf of unit.PDF) {
        if (!pdf.name || !pdf.path) {
          alert("Please fill in all PDF details");
          return;
        }
      }
    }

    const unitsToSend = JSON.parse(JSON.stringify(units));
    console.log(unitsToSend);

    fetch(`http://192.168.0.135:5000/api/admin/subject/${subjectName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unitsToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit data");
      });
  };

  return (
    <>
      <div className="container_admin">
        <h2>Example Form</h2>
        <div className="section">
          <h3>Subject Details</h3>
          <div className="input-field">
            <label htmlFor="subject-name">Subject Name</label>
            <input
              type="text"
              id="subject-name"
              name="subject-name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
            />
          </div>
        </div>

        {units.map((unit, unitIndex) => (
          <div className="unit-section" key={unitIndex}>
            <h3>Unit {unitIndex + 1} Details</h3>
            <div className="input-field">
              <label htmlFor={`unit-title-${unitIndex}`}>
                Unit Title {unitIndex + 1}
              </label>
              <input
                type="text"
                id={`unit-title-${unitIndex}`}
                name={`unit-title-${unitIndex}`}
                value={unit.title}
                onChange={(e) =>
                  handleUnitChange(unitIndex, "title", e.target.value)
                }
                required
              />
            </div>

            <div
              className="section video-section"
              id={`videos-section-${unitIndex}`}
            >
              <h3>Videos</h3>
              {unit.videos.map((video, videoIndex) => (
                <div className="video-entry" key={videoIndex}>
                  <div className="input-field">
                    <label htmlFor={`video-title-${unitIndex}-${videoIndex}`}>
                      Video Title {videoIndex + 1}
                    </label>
                    <input
                      type="text"
                      id={`video-title-${unitIndex}-${videoIndex}`}
                      name={`video-title-${unitIndex}-${videoIndex}`}
                      value={video.title}
                      onChange={(e) =>
                        handleVideoChange(
                          unitIndex,
                          videoIndex,
                          "title",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor={`video-url-${unitIndex}-${videoIndex}`}>
                      Video URL {videoIndex + 1}
                    </label>
                    <input
                      type="url"
                      id={`video-url-${unitIndex}-${videoIndex}`}
                      name={`video-url-${unitIndex}-${videoIndex}`}
                      value={video.url}
                      onChange={(e) =>
                        handleVideoChange(
                          unitIndex,
                          videoIndex,
                          "url",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addVideoEntry(unitIndex)}>
                Add Video
              </button>
            </div>

            <div
              className="section pdf-section"
              id={`pdfs-section-${unitIndex}`}
            >
              <h3>PDFs</h3>
              {unit.PDF.map((pdf, pdfIndex) => (
                <div className="pdf-entry" key={pdfIndex}>
                  <div className="input-field">
                    <label htmlFor={`pdf-name-${unitIndex}-${pdfIndex}`}>
                      PDF Name {pdfIndex + 1}
                    </label>
                    <input
                      type="text"
                      id={`pdf-name-${unitIndex}-${pdfIndex}`}
                      name={`pdf-name-${unitIndex}-${pdfIndex}`}
                      value={pdf.name}
                      onChange={(e) =>
                        handlePDFChange(
                          unitIndex,
                          pdfIndex,
                          "name",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor={`pdf-path-${unitIndex}-${pdfIndex}`}>
                      PDF Path {pdfIndex + 1}
                    </label>
                    <input
                      type="text"
                      id={`pdf-path-${unitIndex}-${pdfIndex}`}
                      name={`pdf-path-${unitIndex}-${pdfIndex}`}
                      value={pdf.path}
                      onChange={(e) =>
                        handlePDFChange(
                          unitIndex,
                          pdfIndex,
                          "path",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addPDFEntry(unitIndex)}>
                Add PDF
              </button>
            </div>
          </div>
        ))}

        <button className="button_admin" type="button" onClick={addUnit}>
          Add Unit
        </button>

        <button className="button_admin" type="button" onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};

export default SubjectForm;
