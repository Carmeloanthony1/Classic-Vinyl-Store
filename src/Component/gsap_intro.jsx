import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Gsap(){
    const navigate = useNavigate();

    useEffect(() => {
        gsap.to(".vinyl, .cta_vinyl_img", { 
          rotation: "-=360", 
          duration: 2, 
          repeat: -1, 
          ease: "none" 
        });

        // Setup kondisi awal elemen vinyl
        gsap.set(".vinyl_queen", { autoAlpha: 0 });
        gsap.set(".cta_vinyl_img", { autoAlpha: 0, scale: 0.8 });

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

        // AUDIO CONTROLLER
        const audio = new Audio();
        audio.preload = "none";
        let button_song = null;

        const songElements = document.querySelectorAll(".song");
        const clickHandlers = [];

        songElements.forEach((song) => {
          const handler = () => {
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
          };
          song.addEventListener("click", handler);
          clickHandlers.push({ song, handler });
        });

        // SECTION 1: MICHAEL JACKSON
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

        // SECTION 2: QUEEN
        addSectionAnimation(sections[1]);

        tl.to(queen(".song-container"), {
            autoAlpha: 0,
            duration: 1,
            onStart: () => audio.pause()
          }, "+=1")
          .to(queen(".hero_container"), { x: 0, duration: 2 }, "<")
          .to(".vinyl_queen", { x: 0, duration: 2 }, "<");

        // TAHAP 2: Travel ke Section 3
        gsap.set(".cta_vinyl_img", { autoAlpha: 0, scale: 0.8 });
        gsap.set(".cta_button", { y: 40, autoAlpha: 0 });

        tl.addLabel("travel-cta", "+=0.5")
          .to(".kanan", { 
            xPercent: -200 / 3, 
            duration: 3, 
            ease: "power2.inOut" 
          }, "travel-cta")
          .to(".vinyl_queen", { 
            x: () => window.innerWidth * 0.8, 
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

        // CLEANUP: Matikan audio & scrolltrigger saat komponen ditutup/pindah halaman
        return () => {
          audio.pause();
          ScrollTrigger.getAll().forEach(t => t.kill());
          clickHandlers.forEach(({ song, handler }) => {
            song.removeEventListener("click", handler);
          });
        };
    }, []);
    return (
        <div className="gsap-intro-wrapper">
            <div className="scroll-container">
                <div className="kanan">
                    
                    {/* SECTION 1: MICHAEL JACKSON */}
                    <section className="opening">
                        <div className="background">
                            <img src="/background.jpeg" alt="background" />
                        </div>

                        <h1>Classic Vinyl Store</h1>

                        <div className="hero_container">
                            <div className="animation">
                                <div className="album">
                                    <img src="/MJ_ALBUM.JPG" alt="Album Cover" id="MJ_COVER" />
                                    <img src="/Vinyl.png" alt="Vinyl Disc" className="vinyl vinyl_mj" />
                                </div>
                            </div>

                            <div className="song-container">
                                <h3>Top three song in the Vinyl</h3>
                                <ul className="song-list">
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/Smooth.mp3">
                                            <img src="/smooth.jpeg" alt="smooth_cover" />
                                            <h4>Smooth Criminal</h4>
                                        </div>
                                    </li>
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/bad.mp3">
                                            <img src="/bad.jpeg" alt="bad_cover" />
                                            <h4>Bad</h4>
                                        </div>
                                    </li>
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/Billie_Jeans.mp3">
                                            <img src="/billie.jpeg" alt="billie_cover" />
                                            <h4>Billie Jeans</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="GSAP-TEXT">Selling Vinyl like Michael Jackson</div>
                    </section>

                    {/* SECTION 2: QUEEN */}
                    <section className="opening">
                        <div className="background">
                            <img src="/background.jpeg" alt="background" />
                        </div>

                        <h1>Classic Vinyl Store</h1>

                        <div className="hero_container">
                            <div className="animation">
                                <div className="album">
                                    <img src="/queen.jpeg" alt="Album Cover" id="QUEEN_COVER" />
                                    <img src="/Vinyl.png" alt="Vinyl Disc" className="vinyl vinyl_queen" />
                                </div>
                            </div>

                            <div className="song-container">
                                <h3>Top three song in the Vinyl</h3>
                                <ul className="song-list">
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/Dontstopme.mp3">
                                            <img src="/dont.jpeg" alt="dont_cover" />
                                            <h4>Dont Stop me Now</h4>
                                        </div>
                                    </li>
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/Goodold.mp3">
                                            <img src="/good.jpeg" alt="good_cover" />
                                            <h4>Good Old-Fashioned Lover Boy</h4>
                                        </div>
                                    </li>
                                    <li className="song-item">
                                        <div className="song" data-audio="/music/Killerqueen.mp3">
                                            <img src="/killer.jpg" alt="killer_cover" />
                                            <h4>Killer Queen</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="GSAP-TEXT">Selling Vinyl like Queen</div>
                    </section>

                    {/* SECTION 3: CTA */}
                    <section className="opening cta">
                        <h1>Classic Vinyl Store</h1>
                        <div className="background">
                            <img src="/background.jpeg" alt="background" />
                        </div>

                        <div className="cta_container">
                            <div className="cta_vinyl">
                                <img src="/Vinylgacor.png" alt="Classic Vinyl Store logo" className="cta_vinyl_img" />
                            </div>

                            <button onClick={() => navigate('/home')} className="cta_button">
                                Checkout more about our business
                            </button>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}