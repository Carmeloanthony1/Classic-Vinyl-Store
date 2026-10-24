import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".vinyl", { rotation: "-=360", duration: 2, repeat: -1, ease: "none" });

// vinyl Queen disembunyikan dulu
gsap.set(".vinyl_queen", { autoAlpha: 0 });

const sections = gsap.utils.toArray(".opening");
const mj = gsap.utils.selector(sections[0]);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "+=14000",
    scrub: 2,
    pin: true,
    invalidateOnRefresh: true   // supaya window.innerWidth dihitung ulang saat resize
  }
});

function addSectionAnimation(section) {
  const q = gsap.utils.selector(section);
  tl.to(q(".hero_container"), { x: -200, duration: 2 })
    .to(q(".vinyl"), { x: 120, duration: 2 })
    .fromTo(q(".song-container h3"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }, "-=1.5")
    .fromTo(q(".song-item"),
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.4 }, "-=0.8");
}

addSectionAnimation(sections[0]);

tl.to(mj(".song-container"), {
    autoAlpha: 0,
    duration: 1,
    onStart: () => audio.pause()
  }, "+=1")
  .to(mj(".hero_container"), { x: 0, duration: 2 }, "<")
  .to(".vinyl_mj", { x: 0, duration: 2 }, "<");

tl.addLabel("travel", "+=0.5")
  .to(".kanan", { xPercent: -50, duration: 6, ease: "power2.inOut" }, "travel")
  .to(".vinyl_mj", { x: () => window.innerWidth, duration: 6, ease: "none" }, "travel")
  .set(".vinyl_mj", { autoAlpha: 0 })
  .set(".vinyl_queen", { autoAlpha: 1 });
  addSectionAnimation(sections[1]);

const audio = new Audio();
audio.preload = "none";
let button_song = null;

document.querySelectorAll(".song").forEach((song) => {
  song.addEventListener("click", () => {
    const src = song.dataset.audio;
    if (!src) return;

    if (button_song === song) {
      audio.paused ? audio.play() : audio.pause();
      return;
    }

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
    button_song = song;
  });
});