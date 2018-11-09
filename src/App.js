import React, { Component } from 'react';
import moment from 'moment';
import './App.scss';
import TimerSettings from './TimerSettings';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerFooter from './TimerFooter';

//https://www.youtube.com/watch?v=3gPbn5LaU_8 1.09th minute

//how to get sessionTime and breakTime to reset to starting values once the clock completes? Possible solution:
//1. create currentTime in state, set it to moment.duration(25, 'minutes')
//2. pass currentTime into TimerDisplay and TimerSettings
//3. in TimerSettings, adjust HandleSessionClick to increase currentTime, as well as sessionTime
//4. in TimerDisplay, make currentTime the value returned in render (as opp'd to the chooseTimer() function currently there)
//5. in parent App, adjust countdown() so that currentTime is set to session/break dep. on this.state.label, then currentTime (NOT sessionTime or breakTime) decrements as timer runs

//how to get audio to play at end? 
//1. Write playSound() function, bind it to constructor
//2. Have playSound() activate right before switchLabel(), as part of the countdown() function when time === 0

class App extends Component {
  constructor(props) {
    super(props)
    //set parent state w/default durations, clock set to 'SESSION', and not running
    this.state = {
      currentTime: moment.duration(25, 'minutes'),
      sessionTime: moment.duration(25, 'minutes'),
      breakTime: moment.duration(5, 'minutes'),
      label: 'SESSION',
      running: false,
      timer: null 
    } 
    
    this.changeSessionTime = this.changeSessionTime.bind(this);
    this.changeBreakTime = this.changeBreakTime.bind(this);
    this.switchLabel = this.switchLabel.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  //change the session and/or break times that are displayed
  changeSessionTime(newSessionTime) {
    if (this.state.running) {
      return //this should make it impossible to increment/decrement while clock is running. Why doesn't it? 
    } else {
      this.setState({
        sessionTime: newSessionTime
      })
    }
  }

  changeBreakTime(newBreakTime) {
    if (this.state.running) {
      return
    } else {
      this.setState({
        breakTime: newBreakTime
      })
    }
  }

  //change the clock setting when an active timer hits 0
  switchLabel() {
    this.setState({
      label: this.state.label === 'SESSION' ? 'BREAK' : 'SESSION',
    })
  }

  //start the timer when start button is clicked
  startTimer() {
    if (this.state.running) {
      return
    } else { 
      this.setState({
        running: true,
        timer: setInterval(this.countdown, 1000)
      })
    }
  }

  //stop the timer when stop (i.e., pause) button is clicked
  stopTimer() {
    if (!this.state.running) {
      return
    } else {
      const interval = this.state.timer

      this.setState({
        running: false,
        timer: clearInterval(interval) 
      })
    }
  }

  //reset the timer when reset button is clicked
  resetTimer() {
    const interval = this.state.timer
    
    this.setState({
      sessionTime: moment.duration(25, 'minutes'),
      breakTime: moment.duration(5, 'minutes'),
      label: 'SESSION',
      running: false,
      timer: clearInterval(interval)  
    })
  }

  //reduce timer by the second when running === true; what if I put a new value (currentTime) into state, and set break/session based on which clock is active??
  countdown() {
    var timeLeft = this.state.label === 'SESSION' ? this.state.sessionTime : this.state.breakTime 
    
    if (this.state.running && this.state.label === 'SESSION') {
      const runningSessionTime = moment.duration(this.state.sessionTime)
      runningSessionTime.subtract(1, 'second')

      this.setState({
        sessionTime: runningSessionTime
      })
    } else if (this.state.running && this.state.label === 'BREAK') {
      const runningBreakTime = moment.duration(this.state.breakTime)
      runningBreakTime.subtract(1, 'second')

      this.setState({
        breakTime: runningBreakTime
      })
    }

    if (this.state.running && timeLeft.get('minutes') === 0 && timeLeft.get('seconds') === 0) {
      this.switchLabel();
    }

  }


  render() {
    return (
      <div className="container-fluid container-clock">
        <TimerSettings currentTime={this.state.currentTime} sessionTime={this.state.sessionTime} breakTime={this.state.breakTime} label={this.state.label} running={this.props.running} changeSessionTime={this.changeSessionTime} changeBreakTime={this.changeBreakTime}/>
        <TimerDisplay currentTime={this.state.currentTime} sessionTime={this.state.sessionTime} breakTime={this.state.breakTime} label={this.state.label} />
        <TimerControls startTimer={this.startTimer} stopTimer={this.stopTimer} resetTimer={this.resetTimer}/>
        <TimerFooter />
      </div>
    );
  }  
}


export default App;
