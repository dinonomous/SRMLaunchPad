import React, {Component} from 'react'
import book from '../assets/icons8-spiral-bound-booklet-64.png'
import image from '../assets/Screenshot 2024-02-08 104758.png'

export default function Preview(props) {
  return (
    <div className="pdfpreview">
        <div className="preview">
          <div className="icon">
              <img src={book}/>
          </div>
          <div className="overlay">
            <img src={image} alt="" className='example'/>
            <div className="text-overlay">
                <h5></h5>
            </div>
          </div>
        </div>
    </div>
  )
}