import React, { Component } from 'react';


//format time values into MM:SS
const formatMMSS = (val) => {
    return val < 10 ? '0' + val : val
} 

class TimerDisplay extends Component {
  constructor(props) {
    super(props)

  this.chooseTimer = this.chooseTimer.bind(this);

  }

  //determine whether session or label is displayed as part of main timer

  chooseTimer() {
    return this.props.label === 'SESSION' ? formatMMSS(this.props.sessionTime.get('minutes')) + ':' + formatMMSS(this.props.sessionTime.get('seconds')) : formatMMSS(this.props.breakTime.get('minutes')) + ':' + formatMMSS(this.props.breakTime.get('seconds'))
  }

  render() {
    return (
      <div className="text-center timer-display">
          <div className="row display-row">
              <div className="col text-center font-weight-bold" id="time-left">{this.chooseTimer()}</div>
          </div>
      </div>
    )

  }
}


export default TimerDisplay;