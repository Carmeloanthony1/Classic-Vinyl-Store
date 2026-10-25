import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Rotasi berputar kontinu untuk semua vinyl (termasuk vinylgacor di section 3)
gsap.to(".vinyl, .cta_vinyl_img", { 
  rotation: "-=360", 
  duration: 2, 
  repeat: -1, 
  ease: "none" 
});

// Setup kondisi awal elemen vinyl
gsap.set(".vinyl_queen", { autoAlpha: 0 });
gsap.set(".cta_vinyl_img", { autoAlpha: 0, scale: 0.8 }); // vinylgacor disembunyikan dulu

const sections = gsap.utils.toArray(".opening");
const mj = gsap.utils.selector(sections[0]);
const queen = gsap.utils.selector(sections[1]);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "+=13000",
    scrub: 2,
    pin: true,
    invalidateOnRefresh: true
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

// ----------------------------------------------------
// SECTION 1: MICHAEL JACKSON
// ----------------------------------------------------
addSectionAnimation(sections[0]);

tl.to(mj(".song-container"), {
    autoAlpha: 0,
    duration: 1,
    onStart: () => audio.pause()
  }, "+=1")
  .to(mj(".hero_container"), { x: 0, duration: 2 }, "<")
  .to(".vinyl_mj", { x: 0, duration: 2 }, "<");

// TAHAP 1: Travel ke Queen (Section 2)
tl.addLabel("travel-queen", "+=0.5")
  .to(".kanan", { xPercent: -100 / 3, duration: 3, ease: "power2.inOut" }, "travel-queen")
  .to(".vinyl_mj", { x: () => window.innerWidth, duration: 3, ease: "none" }, "travel-queen")
  .set(".vinyl_mj", { autoAlpha: 0 })
  .set(".vinyl_queen", { autoAlpha: 1 });

// ----------------------------------------------------
// SECTION 2: QUEEN
// ----------------------------------------------------
addSectionAnimation(sections[1]);

tl.to(queen(".song-container"), {
    autoAlpha: 0,
    duration: 1,
    onStart: () => audio.pause()
  }, "+=1")
  .to(queen(".hero_container"), { x: 0, duration: 2 }, "<")
  .to(".vinyl_queen", { x: 0, duration: 2 }, "<");

// TAHAP 2: Travel ke Section 3 (Fade Out Vinyl Queen -> Fade In Vinyl Gacor)

gsap.set(".cta_vinyl_img", { autoAlpha: 0, scale: 0.8 });
gsap.set(".cta_button", { y: 40, autoAlpha: 0 });

// TAHAP 2: Travel ke Section 3 (Vinyl Terbang & Morphing di Tengah Jalan)

tl.addLabel("travel-cta", "+=0.5")

  .to(".kanan", { 
    xPercent: -200 / 3, 
    duration: 3, 
    ease: "power2.inOut" 
  }, "travel-cta")

  .to(".vinyl_queen", { 
    x: () => window.innerWidth * 0.8, // Terbang melintasi viewport ke kanan
    duration: 3, 
    ease: "power2.inOut" 
  }, "travel-cta")

  .to(".vinyl_queen", { 
    autoAlpha: 0, 
    scale: 0.5, 
    duration: 0.8, 
    ease: "power1.out" 
  }, "travel-cta+=1.2")

  .to(".cta_vinyl_img", { 
    autoAlpha: 1, 
    scale: 1, 
    duration: 1.2, 
    ease: "back.out(1.4)" 
  }, "travel-cta+=1.5")

  .to(".cta_button", { 
    y: 0, 
    autoAlpha: 1, 
    duration: 1, 
    ease: "power2.out" 
  }, "travel-cta+=2.2");

// AUDIO CONTROLLER
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
