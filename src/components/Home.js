import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className='opts'>
        <div className='opt'><Link className='opt-a' to='/events'>Your Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/create-event'>Create New Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/attend'>Confirm Attendance For An Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/attended'>Previously Attended Events</Link></div>
      </div>
      <div className='dummy-1' />
    </div>
  )
}

export default Home