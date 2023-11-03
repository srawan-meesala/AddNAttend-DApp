import React from 'react'
import NotFound from './NotFound'
import AttendedEvent from './AttendedEvent'

const Attended = () => {
  return (
    <div className='layout-eve'>
      <div className='head-1'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {localStorage.address}
        </div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className="events">
        <div className="eve-head">
          Your Events.
        </div>
        <NotFound />
        <AttendedEvent />
        <AttendedEvent />
        <AttendedEvent />
      </div>
    </div>
  )
}

export default Attended