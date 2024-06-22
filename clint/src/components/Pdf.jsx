import React from 'react'

function pdf({ PDF , onClick , reader }) {

  return (
    <>
    {reader ? 
    (
      <>
        <div className="pdf_fullScreen">
          <div className="pdf_frame">
            <iframe src={`${PDF.path}`} frameborder="0" className="pdfiframe skelition"></iframe>
          </div>
          <div className="pdf_menue">
            <button className='button pdf_button' onClick={onClick}>Reader</button>
          </div>
        </div>
      </>
    )
    :
    (
      <div className="pdf ">
      <div className="pdf_frame">
        <iframe src={`${PDF.path}`} frameborder="0" className="pdfiframe skelition"></iframe>
      </div>
      <div className="pdf_menue">
        <button className='button pdf_button' onClick={onClick}>Reader</button>
      </div>
    </div>
  )}
    
    </>
  )
}

export default pdf