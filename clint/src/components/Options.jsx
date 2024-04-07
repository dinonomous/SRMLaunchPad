import React, { useEffect, useState } from 'react';

function Options({ option, onOptionClick, currentQuestionIndex }) {
  const [selectedClassName, setSelectedClassName] = useState(''); // Initial state

  const handleClick = (isCorrect) => {
    setSelectedClassName(isCorrect ? 'quiz_option_correct' : 'quiz_option_wrong');
    onOptionClick(isCorrect, currentQuestionIndex); // Pass selection info
  };

  useEffect(() => {
    setSelectedClassName(''); // Clear class name on question change
  }, [currentQuestionIndex]);

  return (
    <div
      className={`quiz_options ${selectedClassName}`}
      onClick={() => handleClick(option.isCorrect)}
    >
      {option.text}
    </div>
  );
}

export default Options;