import React from "react";
import Format from "../components/Format";
import pic from "../assets/image-removebg-preview.png";
import quizpng from "../assets/quiz.png"

function Landing() {
  return (
    <div>
      <Format>
        <div className="app">
          <div className="textcontainerlanding">
            <h1>Hitting a snag?</h1>
            <h2> Let's brainstorm solutions together!</h2>
          </div>
        </div>
      </Format>
    </div>
  );
}

export default Landing;
