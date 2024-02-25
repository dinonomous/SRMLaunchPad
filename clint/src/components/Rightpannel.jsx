import React from 'react';
import '../css/Rigntpannel.css';
import layers from '../assets/icons8-layers-48.png';

export default function Rightpannel(props) {
    const { topics, onTopicClick, fill} = props; // Extracting topics and onTopicClick function from props

    const handleClick = (index) => {
        // Call the onTopicClick function with the index of the clicked topic
        if (onTopicClick) {
            onTopicClick(index);
        }
    };

    return (
        <nav className="rightnav">
            <div className="lefttext">
                <img src={layers} alt="" />
                <h1>Sub Topics</h1>
            </div>
            <div className='subtopics'>
                <ul className='rightul'>

                    {topics.map((topic, index) => (
                        <li className={`rightli ${fill === index ? "selectedLi" : ""}`} key={index} onClick={() => handleClick(index)}>
                            <div dangerouslySetInnerHTML={{ __html: topic }}></div>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </nav>
    );
}
