import React, { Component } from 'react';
import moment from 'moment';
import './App.scss';
import TimerHeader from './TimerHeader';
import TimerSettings from './TimerSettings';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerFooter from './TimerFooter';

//https://www.youtube.com/watch?v=3gPbn5LaU_8 1.09th minute

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
    this.switchTimer = this.switchTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  //new function to set currentTime to either sessionTime or breakTime based on label?

  //change the session and/or break times that are displayed
  changeSessionTime(newSessionTime) {
      this.setState({
        currentTime: !this.state.running && this.state.label === 'SESSION' ? newSessionTime.clone() : this.state.currentTime,
        sessionTime: newSessionTime
      })
   
  }

  changeBreakTime(newBreakTime) {
      this.setState({
        currentTime: !this.state.running && this.state.label === 'BREAK' ? newBreakTime.clone() : this.state.currentTime,
        breakTime: newBreakTime
      })
  }

  //change the clock setting when an active timer hits 0
  switchLabel() {
    this.setState({
      label: this.state.label === 'SESSION' ? '\xa0' +  'BREAK' : 'SESSION'
    })
  }

  //change the timer from session to break when an active timer hits 0
  switchTimer() {
    this.setState({
      currentTime: this.state.label === 'SESSION' ? this.state.sessionTime.clone() : this.state.breakTime.clone()
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
      currentTime: moment.duration(25, 'minutes'),
      sessionTime: moment.duration(25, 'minutes'),
      breakTime: moment.duration(5, 'minutes'),
      label: 'SESSION',
      running: false,
      timer: clearInterval(interval)  
    })
  }

  //reduce timer by the second when running === true
  countdown() {
    if (this.state.running) {
      this.setState({
        currentTime: this.state.currentTime.subtract(1, 'seconds')
      })
  }

    if (this.state.running && this.state.currentTime.get('minutes') <= 0 && this.state.currentTime.get('seconds') <= 0)  {
      this.playAudio();
      this.switchLabel();
      this.switchTimer();
    }

  }

 playAudio() {
   const beep = document.getElementById("beep");
   beep.play();
 }


  render() {
    return (
      <div className="container-fluid container-clock">
        <TimerHeader />
        <TimerSettings currentTime={this.state.currentTime} sessionTime={this.state.sessionTime} breakTime={this.state.breakTime} label={this.state.label} running={this.props.running} changeSessionTime={this.changeSessionTime} changeBreakTime={this.changeBreakTime}/>
        <TimerDisplay currentTime={this.state.currentTime} />
        <TimerControls startTimer={this.startTimer} stopTimer={this.stopTimer} resetTimer={this.resetTimer}/>
        <TimerFooter />
      </div>
    );
  }  
}


export default App;
