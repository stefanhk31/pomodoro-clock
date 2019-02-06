import React from 'react';


//format time values into MM:SS
const formatMMSS = (val) => {
  return val < 10 ? '0' + val : val
}

const TimerDisplay = (props) => {

  return (
    <div className="text-center timer-display">
      <div className="row display-row">
        <div className="col text-center font-weight-bold" id="time-left">{formatMMSS(props.currentTime.get('minutes'))}:{formatMMSS(props.currentTime.get('seconds'))}</div>
      </div>
    </div>
  )
}

export default TimerDisplay; 