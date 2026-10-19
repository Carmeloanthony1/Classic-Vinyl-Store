import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".opening",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true
    }
});

timeline1.to("#Vinyl", {
    rotate: 360,
    duration: 1.5
});