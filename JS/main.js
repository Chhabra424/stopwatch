
let startTime;
    let updatedTime;
let difference;
    
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
    const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', startPause);
        
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startPause() {
    
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
            timerInterval = setInterval(updateDisplay, 10); 
                startPauseButton.textContent = 'Pause';
    
        isRunning = true;
    } else {
        clearInterval(timerInterval);
      
         difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
          startPauseButton.textContent = 'Start';
    isRunning = false;

    difference = 0;
    lapCounter = 0;
    lapsList.innerHTML = ' ';
}

function updateDisplay() {
    updatedTime = new Date().getTime();

    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;
    
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
}

         function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function formatMilliseconds(unit) {
    if (unit < 10) {
        return `00${unit}`;
    } else if (unit < 100) {
        return `0${unit}`;
    } else {
        return unit;
    }
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
            const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter} :  ${lapTime}`;
            lapsList.appendChild(lapItem);
    }
}
