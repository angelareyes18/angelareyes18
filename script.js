"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const eventDate = Date.parse("2027-01-16T17:00:00-05:00");    
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.log("Countdown elements missing");
        return;
    }

    const daysNumber = daysEl.querySelector(".number");
    const hoursNumber = hoursEl.querySelector(".number");
    const minutesNumber = minutesEl.querySelector(".number");
    const secondsNumber = secondsEl.querySelector(".number");

    if (!daysNumber || !hoursNumber || !minutesNumber || !secondsNumber) {
        console.log("Countdown number elements missing");
        return;
    }

    const countdown = setInterval(() => {

        const now = Date.now();
        const distance = eventDate - now;

        if (distance <= 0) {
            clearInterval(countdown);

            daysNumber.textContent = "0";
            hoursNumber.textContent = "0";
            minutesNumber.textContent = "0";
            secondsNumber.textContent = "0";

            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        daysNumber.textContent = days.toString();
        hoursNumber.textContent = hours.toString();
        minutesNumber.textContent = minutes.toString();
        secondsNumber.textContent = seconds.toString();

    }, 1000);


    // AUDIO 
    const music = document.getElementById("background-music");
    const button = document.getElementById("music-button");

    if (music instanceof HTMLAudioElement && button instanceof HTMLButtonElement) {

        music.volume = 0.3;

        button.addEventListener("click", () => {
            if (music.paused) {
                music.play();
                button.textContent = "⏸ Pause Music";
                button.classList.add("playing");
            } else {
                music.pause();
                button.textContent = "▶ Play Music";
                button.classList.remove("playing");
            }
        });
    }
});