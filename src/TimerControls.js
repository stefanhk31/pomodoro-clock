import React from 'react';

const TimerControls = (props) => (
    <div className="text-center timer-controls">
    <div className="row controls-row">
        <div className="col-xs-4" id="start_stop">
            <div id="start" className="btn btn-success" onClick={props.startTimer}>START</div>
            <div id="stop" className="btn btn-danger" onClick={props.stopTimer}>STOP</div>
        </div> 
      </div>
      <div className="row settings-row">
        <div className="col text-center btn btn-warning" id="reset" onClick={props.resetTimer}>RESET</div>
      </div>
    </div>
)

export default TimerControls;