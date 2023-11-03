import React from 'react'

const Attend = () => {
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
                    <label htmlFor="eve-id">Event's ENS Domain: </label>
                    <input name="eve-id" type="text" placeholder="sunnybeach.eth" />
                </div>
                <div className="form-submit fitem">
                    <button className='form-but'>Confirm Attendance</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Attend