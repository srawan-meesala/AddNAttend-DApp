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
  var participantsList = eventData._participants

  return (
    <>
        <div className='none'>{key}</div>
        <div className="event">
          <div className="name">
            <span>Name: </span>{eventData._name}
          </div>
          <div className="name">
            <span>Domain Name: </span>{eventData[10]}
          </div>
          <div className="start">
            <span>Start Date and Time: </span>{dateString1}&nbsp;&nbsp;{timeString1}
          </div>
          <div className="start">
            <span>End Date and Time: </span>{dateString2}&nbsp;&nbsp;{timeString2}
          </div>
          <div className="start">
            <span>Number Of Participants: </span>{participantsList.length}
          </div>
          {participantsList.length === 0 ? (
            <div className="start">
              No Participants found.
            </div>
          ) : (
            participantsList.map((event, index) => (
              <div className="start">
                <span>Participant Address {index+1}: </span>{participantsList[index][0]} &nbsp; <span>{participantsList[index][1] && "Checked In"} {!participantsList[index][1] && "Haven't Attended yet"}</span>
              </div>
            ))
          )}
        </div>
    </>
  )
}

export default EachEvent