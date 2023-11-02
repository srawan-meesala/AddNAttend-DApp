import React from 'react'
import NotFound from './NotFound'
import EachEvent from './EachEvent'

const Event = ({id}) => {

  

  return (
    <div className='layout-eve'>
      <div className='head-1'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className="events">
        <div className="eve-head">
          Your Events.
        </div>
        <NotFound />
        <EachEvent />
        <EachEvent />
        <EachEvent />
      </div>
    </div>
  )
}

export default Event