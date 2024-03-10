import React, { useState, useEffect } from 'react';
import '../css/Rigntpannel.css';
import layers from '../assets/icons8-layers-48.png';

export default function Rightpannel(props) {
    const { topics, onTopicClick, fill, RightToglle, sideBarPlacement, Notebool } = props;
    const [right, setRight] = useState('0%'); // Initialize right state to 0%

    const handleClick = (index) => {
        if (onTopicClick) {
            onTopicClick(index);
        }
    };

    return (
<nav className="rightnav" style={{ right: RightToglle, ...(Notebool === true && { marginRight: "50vw" }) }}>
            <div className="lefttext">
                <img src={layers} alt="" onClick={() => sideBarPlacement()} />
                <h1>Sub Topics</h1>
            </div>
            <div className='subtopics'>
                <ul className='rightul'>
                    {topics.map((topic, index) => (
                        <li className={`rightli ${fill === index ? "selectedLi" : ""}`} key={index} onClick={() => {handleClick(index);sideBarPlacement()}}>
                            <div dangerouslySetInnerHTML={{ __html: topic }}></div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
