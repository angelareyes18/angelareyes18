"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ENVELOPE: open on click / Enter / Space, then reveal the invitation
    const envelope = document.getElementById("envelope-screen");

    if (envelope) {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const openEnvelope = () => {
            if (envelope.classList.contains("is-opening")) return;

            envelope.classList.add("is-opening");

            // Start the music as part of the tap (browsers require a user gesture)
            const musicButton = document.getElementById("music-button");
            const musicEl = document.getElementById("background-music");
            if (musicButton && musicEl instanceof HTMLAudioElement && musicEl.paused) {
                musicButton.click();
            }

            setTimeout(() => {
                window.scrollTo(0, 0);
                document.body.classList.remove("sealed");
                envelope.classList.add("is-opened");
                setTimeout(() => envelope.remove(), reduceMotion ? 50 : 1000);
            }, reduceMotion ? 50 : 2500);
        };

        envelope.addEventListener("click", openEnvelope);
        envelope.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEnvelope();
            }
        });
    }

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

    let countdown;

    const updateCountdown = () => {

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

    };

    updateCountdown();
    countdown = setInterval(updateCountdown, 1000);


    // AUDIO 
    const music = document.getElementById("background-music");
    const button = document.getElementById("music-button");
    const musicLabel = button && button.querySelector(".music-label");

    if (music instanceof HTMLAudioElement && button instanceof HTMLButtonElement) {

        music.volume = 0.3;

        button.addEventListener("click", () => {
            if (music.paused) {
                music.play().then(() => {
                    if (musicLabel) musicLabel.textContent = "Pause Music";
                    button.classList.add("playing");
                    button.setAttribute("aria-pressed", "true");
                }).catch((err) => {
                    console.log("Music could not play:", err);
                });
            } else {
                music.pause();
                if (musicLabel) musicLabel.textContent = "Play Music";
                button.classList.remove("playing");
                button.setAttribute("aria-pressed", "false");
            }
        });
    }
});