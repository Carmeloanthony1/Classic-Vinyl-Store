import React from "react";
export default function member(){
    
    return(
        <div className="w-full min-h-screen  flex flex-col justify-center items-center font-serif">
            <img
                className="fixed inset-0 w-full h-full object-cover -z-10 opacity-65"
                src="/background_payment.webp"
                alt="Background"
            />        
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">
                <div className="relative w-full h-[78vh] min-h-[420px] flex flex-col bg-[#f9ebd2] rounded-3xl border-[3px] border-[#c89d54] shadow-[0_20px_50px_rgba(30,18,10,0.45)] overflow-hidden">
                    <svg
                        className="pointer-events-none absolute top-0 left-0 w-44 h-44 text-[#2b1a10] z-0"
                        viewBox="0 0 200 200"
                        fill="none"
                    >
                        <path d="M0 0 H110 C85 55 45 85 0 100 Z" fill="currentColor" />
                        <path
                            d="M0 120 C60 105 105 60 125 0"
                            stroke="#c89d54"
                            strokeWidth="1.5"
                            opacity="0.55"
                        />
                        <path
                            d="M0 140 C72 122 125 72 145 0"
                            stroke="#c89d54"
                            strokeWidth="1.2"
                            opacity="0.35"
                        />
                    </svg>

                    <svg
                        className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 text-[#2b1a10] z-0"
                        viewBox="0 0 200 200"
                        fill="none"
                    >
                        <path d="M200 200 H95 C120 145 155 115 200 100 Z" fill="currentColor" />
                        <path
                        d="M200 80 C140 95 95 140 75 200"
                        stroke="#c89d54"
                        strokeWidth="1.5"
                        opacity="0.55"
                        />
                        <path
                        d="M200 60 C128 78 75 128 55 200"
                        stroke="#c89d54"
                        strokeWidth="1.2"
                        opacity="0.35"
                        />
                    </svg>

                    <div className="relative z-10 shrink-0 w-full flex justify-between items-center text-[#2b1a10] px-10 md:px-24 pt-6 pb-3">
                        <div className="flex-1 pl-11 text-center mt-12">
                            <h1 className="text-4xl font-bold tracking-light">
                                Become a Member
                            </h1>
                            <p>Join the Club and Spin the finest Vinyl</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            title="Back"
                            className="w-11 h-11 rounded-full bg-[#2b1a10] text-[#f9ebd2] flex items-center justify-center shadow-md hover:bg-[#42291a] transition cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            >
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative z-10 flex-1 w-full grid grid-cols-1 gap-10 items-center px-10 pb-8">
                        <div className="flex flex-col gap-5 items-center md:items-start">
                            <img src="Certificate.jpeg" className="w-full max-w-lg rounded-xl aspect-[16/9] overflow-hidden border border-[#c89d54] shadow-md bg-[#fffdf9]"/>
                        </div>
                        <ul className="space-y-3 text-sm md:text-base ">
                            <li className="flex items-center gap-3 ">
                                <span className="w-5 h-5 rounded-full bg-[#c89d54] text-[#f9ebd2] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                <span className="text-black">10% Off All Records & Merchandise</span>
                            </li>
                            <li className="flex items-center gap-3 ">
                                <span className="w-5 h-5 rounded-full bg-[#c89d54] text-[#f9ebd2] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                <span className="text-black">Exclusive Early Access to Rare Drops</span>
                            </li>
                            <li className="flex items-center gap-3 ">
                                <span className="w-5 h-5 rounded-full bg-[#c89d54] text-[#f9ebd2] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                <span className="text-black">Member-Only Free Shipping on Orders</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
}