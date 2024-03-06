import React, { useState, useEffect } from "react";
import "../css/App.css";
import plus from "../assets/plus.svg";
import Notes from "../components/Notes";

function NotesWindow() {
  const [addNoteState, setAddNoteState] = useState(false);
  const [editNoteIndex, setEditNoteIndex] = useState(null);
  const [input, setInput] = useState("");
  const [serchtext, setSerchtext] = useState("");
  const [notes, setNotes] = useState([]); // Initialize with null
  const [originalNotes, setOriginalNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("Dinesh-notesapplications-3")
    );
    console.log("Retrieved from localStorage:", savedNotes);
    setNotes(savedNotes);
    setOriginalNotes([...savedNotes]); // Create a copy of savedNotes
  }, []);

  useEffect(() => {
    // Make sure to save notes only if it's not null
    if (notes.length !== 0) {
      localStorage.setItem("Dinesh-notesapplications-3", JSON.stringify(notes));
      console.log("Saved to localStorage:", notes);
    }
  }, [notes]);

  function deletenote(index) {
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
    setOriginalNotes(newNotes); // Update originalNotes as well
  }

  function display(note, index) {
    const date = new Date();
    console.log("display");
    return (
      <Notes
        key={index}
        index={index}
        content={note.content}
        date={date.toLocaleDateString()}
        onClick={() => setEditNoteIndex(index)}
        deletenote={deletenote}
      />
    );
  }

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSerchtext(searchTerm);
    setOriginalNotes(notes);

    if (searchTerm !== "") {
      // Filter notes only when there's a search term
      const filteredNotes = originalNotes.filter((note) =>
        note.content.toLowerCase().includes(searchTerm)
      );
      setNotes(filteredNotes);
    } else {
      // Reset notes to original list when search bar is empty
      setNotes(originalNotes); // Restore the original notes array
    }
  }

  function editNote() {
    if (editNoteIndex === null) return null;
    const initialContent = notes[editNoteIndex].content;
    return (
      <div className="note-overlay" onClick={() => setEditNoteIndex(null)}>
        <div
          className="note-overlay-content bg-dark"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            value={input || initialContent}
            onChange={(e) => setInput(e.target.value)}
            className="bg-dark border border-3 rounded"
          />
          <button
            onClick={() => {
              const updatedNotes = [...notes];
              updatedNotes[editNoteIndex].content = input;
              setNotes(updatedNotes);
              setEditNoteIndex(null);
              setInput("");
              setOriginalNotes(updatedNotes);
            }}
          >
            Update Note
          </button>
        </div>
      </div>
    );
  }

  function addNote() {
    return (
      <div
        className="note-overlay"
        onClick={() => {
          setAddNoteState(false);
        }}
      >
        <div
          className="note-overlay-content bg-dark"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-dark border border-3 rounded"
          />
          <button
            onClick={() => {
              if (input.trim() !== "") {
                setNotes([...notes, { content: input }]);
                setAddNoteState(false);
                setInput("");
                setOriginalNotes([...notes, { content: input }]);
              } else {
                alert("Please enter a note before adding!");
              }
            }}
          >
            Add Note
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container-fullwidth m-0 p-0 d-flex flex-column main_note">
      <div className="displayflex">
        <div className="search-container">
          <div className="add my-auto" onClick={() => setAddNoteState(true)}>
            <i>
              <img src={plus} alt="" />
            </i>
          </div>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
        </div>
      </div>
      {addNoteState && addNote()}
      <div className="wrapper-container">
        <div className="container mx-auto wrapper">
          {notes.map((note, index) => display(note, index))}
        </div>
      </div>
      {editNoteIndex !== null && editNote()}
    </main>
  );
}

export default NotesWindow;
