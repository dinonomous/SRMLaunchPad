import "../css/note.css"
import { useState } from 'react'
import del from "../assets/delete-clipboard-svgrepo-com.svg"

function Notes({ index, content, onClick , date, deletenote}) {
    return (
        <div key={index} className="bg-dark text-light border border-4 rounded noteref" onClick={onClick}>
            {content}
            <div className="fotter_note" onClick={(e)=>{e.stopPropagation({onClick})}}>
                <span>{date}</span>
                <div onClick={()=>deletenote(index)}>
                 <img src={del} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Notes;
