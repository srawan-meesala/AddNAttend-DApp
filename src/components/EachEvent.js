import React from 'react'

const EachEvent = () => {
  return (
    <>
        <div className="event">
          <div className="name">
            <span>Name: </span>
          </div>
          <div className="start">
            <span>Starts in:</span>
          </div>
          <div className="loc">
            <span>Location:</span>
          </div>
          <div className="attendees">
            <span>Number Of Attendees:</span>
          </div>
          <div className="attendees-list">
            <span>List Of Attendees:</span>
          </div>
        </div>
    </>
  )
}

export default EachEvent