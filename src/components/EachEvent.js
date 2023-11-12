import React from 'react'
import RegisteredUser from './RegisteredUser'

const EachEvent = ({key, eventData}) => {

  const unixTimestamp = eventData.date.toNumber();
  console.log(unixTimestamp);
  const jsDate = new Date(unixTimestamp * 1000);
  console.log('JavaScript Date:', jsDate);
  const dateString = jsDate.getDate() + '-' + jsDate.getMonth() + '-' + jsDate.getFullYear()
  console.log(dateString);
  var hours = jsDate.getHours()
  var min = jsDate.getMinutes()
  if (min<10){
    min = '0' + min
  }
  if (hours<10){
    hours = '0' + hours
  }
  console.log(hours+':'+min);
  const timeString = hours+' : '+min;
  return (
    <>
        <div className='none'>{key}</div>
        <div className="event">
          <div className="name">
            <span>Name: </span>{eventData.name}
          </div>
          <div className="start">
            <span>Date: </span>{dateString}
          </div>
          <div className="start">
            <span>Time: </span>{timeString}
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