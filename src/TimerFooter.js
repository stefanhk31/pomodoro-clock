import React from 'react';

const TimerFooter = () => (
    <div className="text-center timer-footer">
        <div className="row">
            <div className="col text-center" id="footer"><em>by <a href="https://github.com/stefanhk31">stefanhk31</a></em></div>
        </div>
        <audio id="beep" src="https://raw.githubusercontent.com/stefanhk31/audio-files/master/246332__kwahmah-02__five-beeps.wav" />
    </div>
)

export default TimerFooter;