import React, { useEffect, useState } from "react";
import Format from "../components/Format";
import pic from "../assets/image-removebg-preview.png";
import quizpng from "../assets/quiz.png"
import studybg from "../assets/windrisesbackground.png"
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [logedin,setloggedin] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      setloggedin(true)
      return;
    }
  },[])
  return (
    <div>
      <Format>
        <div className="app">
          <div className="page1_homescreen">
            <div className="textcontainerlanding">
              <h1>Hitting a Snag?</h1>
              <h2> Let's brainstorm solutions together!</h2>
              { !logedin &&  <button className="login_button button" onClick={()=>{navigate('/login')}}>
                Login
              </button>}
              
            </div>
            <div className="page1_homescreen_bg_div">
              <img src={studybg} alt="" srcset="" className="page1_homescreen_background"/>
            </div>
          </div>
        </div>
      </Format>
    </div>
  );
}

export default Landing;
