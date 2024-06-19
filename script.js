
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        startStopButton.textContent = 'Stop';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer); // Clear the interval to stop the timer
    isRunning = false; // Set isRunning to false since the timer is stopped
    elapsedTime = 0; // Reset elapsed time to 0
    lapTimes = []; // Clear the lap times array
    startStopButton.textContent = 'Start'; // Reset the start/stop button text to 'Start'
    display.textContent = formatTime(elapsedTime); // Update the display with the reset time
    lapsList.innerHTML = ''; // Clear the laps list
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        displayLapTimes();
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function displayLapTimes() {
    lapsList.innerHTML = lapTimes.map((lapTime, index) => {
        const formattedTime = formatTime(lapTime);
        return `<li>Lap ${index + 1}: ${formattedTime}</li>`;
    }).join('');
}
