import React from 'react'
import RegisteredUser from './RegisteredUser'

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
          <div className="register-list">
            <span>Registered Users:</span>
            <RegisteredUser />
          </div>
          <div className="attendees-list">
            <span>Attendees: </span>
          </div>
        </div>
    </>
  )
}

export default EachEvent