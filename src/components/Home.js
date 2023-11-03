import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({id, setid}) => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.clear();
    setid({address: ''})
    navigate('/')
  }
  
  console.log('Local Storage', localStorage);

  console.log('Home',id.address);

  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {localStorage.address}
        </div>
        <div className='but-log'>
          <button onClick={logoutHandler} className='but-out'>Logout</button>
        </div>
      </div>
      <div className='opts'>
        <div className='opt'><Link className='opt-a' to='/events'>Your Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/create-event'>Create New Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/attend'>Register For An Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/registered'>Registered Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/attended'>Previously Attended Events</Link></div>
      </div>
      <div className='dummy-1' />
    </div>
  )
}

export default Home