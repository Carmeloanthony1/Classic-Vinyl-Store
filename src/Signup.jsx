import React from "react";
export default function Signup(){
    return(
        <div className="relative w-full h-screen overflow-hidden font-cinzel">
            <img className = "absolute h-full w-full opacity-60" src="/Background_signup.png"/>
            <div className="flex justify-between flex-row">
                <div className="relative z-10 p-4 rounded-xl flex items-center gap-4">
                    <img className="bg-[#ffffff] border-2 p-2 z-0 w-15 h-15 object-cover rounded-xl shadow-2xl" src="logo.png"/>
                    <h2 className="text-2xl font-bold text-white"> | </h2>
                    <h2 className="text-xl font-bold text-white">Classic Vinyl Store</h2>
                </div>
                <div className="relative z-10 p-4 rounded-xl flex items-center gap-2">
                    <span className="text-white font-bold">already have an account?</span>
                    <div className="flex items-center gap-1 cursor-pointer hover:scale-105">
                        <h3 className="text-xl font-bold">Login</h3>
                        <svg className = "w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>
            </div>
            
        </div>
    );
}