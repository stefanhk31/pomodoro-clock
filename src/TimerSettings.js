import React, { Component } from 'react';


class TimerSettings extends Component { 
    constructor(props) {
        super(props)

        this.handleSessionClick = this.handleSessionClick.bind(this);
        this.handleBreakClick = this.handleBreakClick.bind(this);
    }

    //increment/decrement session and break times when user clicks + and - buttons
    //handleSessionClick has to update currentTime, as well, so that main clock will reflect initial adjustments
    handleSessionClick(e) {
        const newSessionTime = this.props.sessionTime;
        //const newCurrentTime = this.props.currentTime;

        switch (e.target.id) {
            case "session-increment":
                //newCurrentTime.add(1, 'minutes');
                newSessionTime.add(1, 'minutes');
                break;
            case "session-decrement":
                //newCurrentTime.subtract(1, 'minutes');
                newSessionTime.subtract(1, 'minutes');
                break;
        }

        /*if (this.props.currentTime.get('minutes') < 0) {
            this.props.currentTime.add(1, 'minutes')
    } */


        if (this.props.sessionTime.get('minutes') < 0) {
            this.props.sessionTime.add(1, 'minutes')
        }


        this.props.changeSessionTime(newSessionTime);       
    }

    handleBreakClick(e) {
        const newBreakTime = this.props.breakTime;

        switch (e.target.id) {
            case "break-increment":
                newBreakTime.add(1, 'minutes');
                break;
            case "break-decrement":
                newBreakTime.subtract(1, 'minutes');
                break;
        }

        if (this.props.breakTime.get('minutes') < 0) {
            this.props.breakTime.add(1, 'minutes')
        }

        this.props.changeBreakTime(newBreakTime);

    }

    render() {
        return (
            <div className="text-center timer-settings">
                <div className="row settings-row">
                    <div className="col-xs-1 btn btn-primary" id="session-increment" onClick={this.handleSessionClick}>+</div> 
                    <div className="col-xs-1" id="session-label">SESSION:&nbsp;</div>
                    <div className="col-xs-1" id="session-length">{this.props.sessionTime.get('minutes')}:00&nbsp;</div>
                    <div className="col-xs-1 btn btn-primary" id="session-decrement" onClick={this.handleSessionClick}>-</div> 
                </div>
                <div className="row settings-row">
                    <div className="col-xs-1 btn btn-primary" id="break-increment" onClick={this.handleBreakClick}>+</div>
                    <div className="col-xs-1" id="break-label">BREAK:&nbsp;</div>
                    <div className="col-xs-1" id="break-length">{this.props.breakTime.get('minutes')}:00&nbsp;</div>
                    <div className="col-xs-1 btn btn-primary" id="break-decrement" onClick={this.handleBreakClick}>-</div> 
                </div>
                <div className="row settings-row">
                    <div className="col-md-1 text-primary text-center font-weight-bold" id="timer-label">{this.props.label}</div>
                </div>
            </div>
        )   

    }
}


export default TimerSettings;