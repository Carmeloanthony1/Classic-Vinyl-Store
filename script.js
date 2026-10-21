import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#Vinyl", {
    rotate: "-=360", duration: 1, repeat: -1, ease: "linear", 
    scrollTrigger: {
        trigger: ".opening",
        start: "top top",
        end: "+=2500",
        scrub: false
    }
});

const timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".opening",
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true
    }
});
timeline1.to(".hero_container", { x: -200, duration: 2 })
timeline1.to("#Vinyl", {x: 120, duration: 2})
timeline1.fromTo(".song-container h3", 
    { opacity: 0, y: 20},
    { opacity: 1, y: 0, duration: 1}, "-=1.5"
)
timeline1.fromTo(".song-item", 
    { opacity: 0, x: 50},
    { opacity: 1, x: 0, duration: 1, stagger: 0.4 }, "-=0.8"
)
timeline1.to(".song-container", {
    pointerEvents: "auto",
    duration: 0.1
}, "<");

const audio = new Audio();
audio.preload = "none"; 
//file lagu ngga di download sebelum klik di play
let button_song = null;

document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const src = button.dataset.audio; //membaca syntax data-audio di html
        if(!src) return;

        if(button_song === button){
            audio.paused ? audio.play() : audio.pause(); //kalau sedang pause, maka play, kalau sedang play, maka pause 
            return;
        }

        audio.pause();
        audio.src = src; //ganti lagu, jadi lagu yang ingin di ganti 
        audio.currentTime = 0; //balikin lagi ke waktu 0
        audio.play();
        button_song = button;
    });
});