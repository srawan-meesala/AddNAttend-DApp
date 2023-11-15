import React from 'react';

const EachEvent = ({key, eventData}) => {
  console.log(eventData);
  const unixTimestamp1 = eventData._startTime.toNumber();
  const unixTimestamp2 = eventData._endTime.toNumber();
  const jsDate1 = new Date(unixTimestamp1 * 1000);
  const jsDate2 = new Date(unixTimestamp2 * 1000);

  const dateString1 = jsDate1.getDate() + '-' + jsDate1.getMonth() + '-' + jsDate1.getFullYear()
  var hours1 = jsDate1.getHours()
  var min1 = jsDate1.getMinutes()
  if (min1<10){
    min1 = '0' + min1
  }
  if (hours1<10){
    hours1 = '0' + hours1
  }
  console.log("start" + hours1 + ':' + min1);
  const timeString1 = hours1+' : '+min1;

  const dateString2 = jsDate1.getDate() + '-' + jsDate1.getMonth() + '-' + jsDate1.getFullYear()
  var hours2 = jsDate2.getHours()
  var min2 = jsDate2.getMinutes()
  if (min2<10){
    min2 = '0' + min2
  }
  if (hours2<10){
    hours2 = '0' + hours2
  }
  console.log("start" + hours2 + ':' + min2);
  const timeString2 = hours2 +' : '+min2;

  return (
    <>
        <div className='none'>{key}</div>
        <div className="event">
          <div className="name">
            <span>Name: </span>{eventData._name}
          </div>
          <div className="start">
            <span>Start Date: </span>{dateString1}
          </div>
          <div className="start">
            <span>Start Time: </span>{timeString1}
          </div>
          <div className="start">
            <span>End Date: </span>{dateString2}
          </div>
          <div className="start">
            <span>End Time: </span>{timeString2}
          </div>
        </div>
    </>
  )
}

export default EachEvent