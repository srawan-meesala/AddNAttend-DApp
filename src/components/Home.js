import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({id, setid}) => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    setid({address: ''})
    navigate('/')
  }

  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {id.address}
        </div>
        <div className='but-log'>
          <button onClick={logoutHandler} className='but-out'>Logout</button>
        </div>
      </div>
      <div className='opts'>
        <div className='opt'><Link className='opt-a' to='/events'>Your Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/create-event'>Create New Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/register'>Register For An Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/checkin'>Enter a Check In</Link></div>
        <div className='opt'><Link className='opt-a' to='/balance'>Check Your Balance</Link></div>
      </div>
      {/* {!data._hex && <div className='dummy-1' >Balance: Fetching...</div>}
      {data && <div className='dummy-1' >Balance: {parseInt(data._hex, 10)}</div>}
       */}
       <div className='dummy-1' ></div>
    </div>
  )
}

export default Home