import React, { useRef, useState, useEffect } from "react";
import "../css/quiz.css";
import Question from "../components/quiz/Question";
import { useParams } from "react-router-dom";
import Format from "../components/Format";
const apiUrl = import.meta.env.VITE_API_URL;
const apiFrontUrl = import.meta.env.VITE_API_FRONT_URL;
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Quiz(props) {
  const [unitTitle, setUnitTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswered, setUserAnswered] = useState(
    Array(questions.length).fill(false)
  ); // Answered state for each question
  const pillRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ width: "4rem" });
  const [pillText, setPillText] = useState(""); // Empty string for text
  const [explanation,setExplanation] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showfloat,setShowfloat] = useState(false);
  const { collection,title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    resetState();
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/quizapi/${collection}/${title}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const { unitTitle, questions } = data;
        console.log("Data received from backend:", data);
        setUnitTitle(unitTitle);
        setQuestions(shuffleArray(questions)); // Shuffle questions array
        console.log(unitTitle, questions);

      } catch (error) {
        console.error('Network error:', error);
        navigate('/login');
        // Handle the network error
      }
    };

    fetchData();
  }, [collection, title]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetState = () => {
    setUnitTitle("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setUserAnswered([]);
    setPillStyle({ width: "4rem" });
    setPillText("");
    setExplanation("");
    setCurrentQuestion(null);
    setShowfloat(false);
  };

  useEffect(() => {
    const newStyle = {
      width: correctAnswers > 0 ? "10rem" : "4rem",
    };
    const newText = correctAnswers > 0 ? "Correct! " : ""; // Show text on correct answer

    setPillStyle(newStyle);
    setPillText(newText);

    if (correctAnswers > 0) {
      setTimeout(() => {
        setPillStyle({ width: "4rem" });
        setPillText("");
      }, 2000);
    }
  }, [correctAnswers]);


  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };
  const handleprevQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setExplanation(questions[currentQuestionIndex].explanation);
      setShowfloat(false);
    } else {
      setCurrentQuestion(null); // Reset current question if index is out of bounds
    }
  }, [currentQuestionIndex, questions]);

  const handleUserChoice = (isCorrect, questionIndex) => {
    if (!userAnswered[questionIndex]) {
      // Check if already answered
      setCorrectAnswers((prevCorrect) =>
        isCorrect ? prevCorrect + 1 : prevCorrect
      );
      setUserAnswered((prevAnswered) => {
        const updatedAnswered = [...prevAnswered];
        updatedAnswered[questionIndex] = true;
        setShowfloat(true);
        return updatedAnswered;
      });
    }
  };

  return (
    <>
    <Format>
      <span className="quiz_parent">
        <div className="quiz_top">
          <>
            <span>
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handleprevQuestion}
                  className="quiz_controle_buttons"
                >
                  previous Question
                </button>
              )}
            </span>
            <span className="quiz_tile">
              <h1>{unitTitle}</h1>
            </span>
            <span>
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="quiz_controle_buttons"
                >
                  Next Question
                </button>
              )}
            </span>
          </>
        </div>
        {currentQuestion && (
          <>
            <div className="quiz_content ">
              <div className="loder skelition">
              <Question
                currentQuestionIndex={currentQuestionIndex}
                currentQuestion={currentQuestion}
                onOptionClick={handleUserChoice}
                hasAnswered={userAnswered[currentQuestionIndex]} // Pass answered state
                showfloat={showfloat}
                explanation={explanation}
                
              />
              </div>
            </div>
          </>
        )}
        <div className="quizz_pill" ref={pillRef} style={pillStyle}>
          {pillText && <p>{pillText}    </p>}
          {correctAnswers}
        </div>
        </span>
      </Format>
    </>
  );
}

export default Quiz;
