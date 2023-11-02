import React from 'react'

const CreateEvent = () => {
  return (
    <div className='layout'>
        <div className='head'>
            <div className='logo'>Add<span>n</span>Attend.</div>
            <div className='but-log'>
                <button className='but-out'>Logout</button>
            </div>
        </div>
        <div className='body'>
            <form className='form' action="" method="post">
                <div className="form-name fitem">
                    <label htmlFor="name">Name Of The Event: </label>
                    <input name="name" type="text" placeholder="Rocky's Birthday" />
                </div>
                <div className="form-name fitem">
                    <label htmlFor="name">Choose an ENS Domain: </label>
                    <input name="name" type="text" placeholder="rockyrocks.test" />
                </div>
                <div className="form-date fitem">
                    <label htmlFor="name">Date: </label>
                    <input name="name" type="date" />
                </div>
                <div className="form-time fitem">
                    <label htmlFor="name">Time: </label>
                    <input name="name" type="time" />
                </div>
                <div className="form-location fitem">
                    <label htmlFor="location">Location: </label>
                    <input name="location" type="text" placeholder='New York City' />
                </div>
                <div className="form-submit fitem">
                    <button className='form-but'>Create Event</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEvent