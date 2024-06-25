import React, { useState } from "react";

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    subject: "",
    title: "",
    questions: [
      {
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        explanation: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...quiz.questions];
    questions[index][name] = value;
    setQuiz({ ...quiz, questions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { name, value, type, checked } = e.target;
    const questions = [...quiz.questions];
    questions[qIndex].options[oIndex][name] =
      type === "checkbox" ? checked : value;
    setQuiz({ ...quiz, questions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          explanation: "",
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quiz);

    fetch(`http://192.168.0.135:5000/api/admin/Quiz/${quiz.subject}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset form or show success message
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container_admin">
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className="form_quiz">
        <div className="section">
        <h3>Subject Details</h3>
          <div className="input-field">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={quiz.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-field">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="unit-section">
            <h3>Question {qIndex + 1}</h3>
            <div className="input-field">
              <label>Question Text:</label>
              <input
                type="text"
                name="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                required
              />
            </div>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="input-field">
                <label>Option {oIndex + 1}:</label>
                <input
                  type="text"
                  name="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    name="isCorrect"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  />
                  Correct
                </label>
              </div>
            ))}
            <div className="input-field">
              <label>Explanation:</label>
              <input
                type="text"
                name="explanation"
                value={question.explanation}
                onChange={(e) => handleQuestionChange(qIndex, e)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="button">
          Add Question
        </button>
        <button type="submit" className="button">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
