let progressInterval;
let isPaused = true;

function changeIcon() {
    var icon = document.getElementById("icon");
    var progressBar = document.getElementById("progressBar");

    console.log("Icon class before change:", icon.className);
    console.log("Progress bar animation state before change:", progressBar.style.animationPlayState);

    if (icon.classList.contains("fa-play")) {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        progressBar.classList.add("running");
        startProgress();
    } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        progressBar.classList.remove("running");
        pauseProgress();
    }

    console.log("Icon class after change:", icon.className);
    console.log("Progress bar animation state after change:", progressBar.style.animationPlayState);
}

function startProgress() {
    if (isPaused) {
        progressInterval = setInterval(updateProgress, 1000);
        isPaused = false;
    }
}

function pauseProgress() {
    clearInterval(progressInterval);
    isPaused = true;
}

function updateProgress() {
    currentTime += 1;

    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = currentTime % 60;
    elapsedTime.textContent = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

    const timeLeft = duration - currentTime;
    const remainingMinutes = Math.floor(timeLeft / 60);
    const remainingSeconds = timeLeft % 60;
    remainingTime.textContent = `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;

    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;

    if (currentTime >= duration) {
        clearInterval(progressInterval);
    }
}

function resetProgressBar() {
    var progressBar = document.getElementById("progressBar");
    progressBar.classList.remove("progress-bar");
    void progressBar.offsetWidth;
    progressBar.classList.add("progress-bar");

    currentTime = 0;

    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = currentTime % 60;
    elapsedTime.textContent = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`;

    const timeLeft = duration - currentTime;
    const remainingMinutes = Math.floor(timeLeft / 60);
    const remainingSeconds = timeLeft % 60;
    remainingTime.textContent = `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;

    progressBar.value = 0;
}

// Variables
const progressBar = document.getElementById('progressBar');
const elapsedTime = document.getElementById('elapsed-time');
const remainingTime = document.getElementById('remaining-time');

let duration = 230; // 3 minutes 50 seconds
let currentTime = 0;

function updateDeviceText() {
    const deviceElement = document.querySelector('.device');
    if (window.innerWidth <= 600) {
        deviceElement.textContent = "This Phone";
    } else if (window.innerWidth <= 900) {
        deviceElement.textContent = "This Tablet";
    } else {
        deviceElement.textContent = "This Computer";
    }
}

updateDeviceText();

window.addEventListener('resize', updateDeviceText);

function toggleSwitchColor(switchElement) {
    if (switchElement.style.color === 'rgb(29, 207, 93)') {
        switchElement.style.color = '';
    } else {
        switchElement.style.color = '#1dcf5d';
    }
}

const switchOne = document.getElementById('switchone');
const switchTwo = document.getElementById('switchtwo');

switchOne.style.color = '';
switchTwo.style.color = '';

switchOne.addEventListener('click', () => toggleSwitchColor(switchOne));
switchTwo.addEventListener('click', () => toggleSwitchColor(switchTwo));