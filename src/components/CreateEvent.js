import React, { useState } from 'react'

const CreateEvent = () => {

    const [error, setError] = useState("");

    return (
        <div className='layout'>
            <div className='head'>
                <div className='logo'>Add<span>n</span>Attend.</div>
                <div className='head-name' id='head-name'>
                    {localStorage.address}
                </div>
                <div className='but-log'>
                    <button className='but-out'>Logout</button>
                </div>
            </div>
            <div className='body'>
                <form className='form' action="" method="post">
                    <div className="form-name fitem">
                        <label htmlFor="name">Name Of The Event: </label>
                        <input name="name" type="text" placeholder="Rocky's Birthday" required/>
                    </div>
                    <div className="form-name fitem">
                        <label htmlFor="name">Choose an ENS Domain: </label>
                        <input name="name" type="text" placeholder="rockyrocks.test" required/>
                    </div>
                    <div className="form-date fitem">
                        <label htmlFor="name">Date: </label>
                        <input name="name" type="date" required/>
                    </div>
                    <div className="form-time fitem">
                        <label htmlFor="name">Time: </label>
                        <input name="name" type="time" required/>
                    </div>
                    <div className="form-location fitem">
                        <label htmlFor="location">Location: </label>
                        <input name="location" type="text" placeholder='New York City' required/>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-submit fitem">
                        <button className='form-but'>Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent