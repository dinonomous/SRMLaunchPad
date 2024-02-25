import React from 'react'
import Format from '../components/Format'
import pic from '../assets/image-removebg-preview.png'

function Landing() {
  return(
    <div>
        <Format >
            <div className="app">
                <div className="left">
                    <h1>Hitting a snag?</h1>
                    <h2> Let's brainstorm solutions together!</h2>
                </div>
            
            <div className="right">
                <div className="card">
                    <div className="cardtext">
                            <h1 className='cardh1'>Video lectures</h1>
                            <p>Handwritten notes and materials</p>
                    </div>
                    <img src={pic} alt="" className='pic'/>
                </div>
            </div>
            </div>
        </Format>
    </div>
  );
}

export default Landing
