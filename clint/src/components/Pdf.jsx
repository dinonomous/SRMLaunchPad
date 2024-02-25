import React from 'react'

function pdf({ PDF }) {
  return (
    <>
    <div className="pdf">
        <iframe src={PDF.length > 0 ? PDF[0].path : ''} frameborder="0" className="pdfiframe"></iframe>
    </div>
    </>
  )
}

export default pdf