let progressInterval;
let isPaused = true;
let duration = 195; // 3.15 minutes
let currentTime = 0;

const progressBar = document.getElementById('progressBar');
const elapsedTime = document.getElementById('elapsed-time');
const remainingTime = document.getElementById('remaining-time');
const icon = document.getElementById("icon");
const audio = new Audio('../Images/Audio/ocean-eyes.mp3');

function changeIcon() {
    console.log("Icon class before change:", icon.className);
    console.log("Progress bar animation state before change:", progressBar.style.animationPlayState);

    if (icon.classList.contains("fa-play")) {
        icon.classList.replace("fa-play", "fa-pause");
        progressBar.classList.add("running");
        startProgress();
        audio.play();
    } else {
        icon.classList.replace("fa-pause", "fa-play");
        progressBar.classList.remove("running");
        pauseProgress();
        audio.pause();
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
        resetIconAndProgressBar();
    }
}

function resetIconAndProgressBar() {
    icon.classList.replace("fa-pause", "fa-play");
    progressBar.classList.remove("running");
    resetProgressBar();
}

function resetProgressBar() {
    progressBar.classList.remove("progress-bar");
    void progressBar.offsetWidth; // Trigger reflow
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

    // Restart the audio
    audio.currentTime = 0;
    audio.play();
}

progressBar.addEventListener('animationend', resetIconAndProgressBar);

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
    switchElement.style.color = switchElement.style.color === 'rgb(29, 207, 93)' ? '' : '#1dcf5d';
}

const switchOne = document.getElementById('switchone');
const switchTwo = document.getElementById('switchtwo');

switchOne.style.color = '';
switchTwo.style.color = '';

switchOne.addEventListener('click', () => toggleSwitchColor(switchOne));
switchTwo.addEventListener('click', () => toggleSwitchColor(switchTwo));