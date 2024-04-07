import React, { useState } from "react";
import Options from "./Options";

function Question({ currentQuestionIndex, currentQuestion, onOptionClick, showfloat, explanation }) {
  return (
    <>
      <span className="quiz_question_left">
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.text}</p>
        {showfloat && <div className="quiz_float">{explanation}</div>}
      </span>
      <span className="quiz_options_right">
        {currentQuestion.options.map((option, index) => (
          <Options
            key={index}
            option={option}
            onOptionClick={onOptionClick}
            currentQuestionIndex={currentQuestionIndex}
          />
        ))}
      </span>
    </>
  );
}

export default Question;
