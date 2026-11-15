import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Berhasil masuk");
                navigate("/Home");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error", error);
            alert("Terjadi kesalahan server");
        } finally {
            setIsloading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center font-sans p-4">
            
            <img 
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" 
                src="/Background_signup.png" 
                alt="Background"
            />

            <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6">
                {/* Kiri: Logo */}
                <div className="flex items-center gap-3">
                    <img 
                        className="bg-white border-2 border-[#d4c4b5] p-2 w-16 h-16 object-cover rounded-xl shadow-lg" 
                        src="/logo.png" 
                        alt="Logo"
                    />
                    <span className="text-2xl font-bold text-white">|</span>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md font-cinzel">
                        Classic Vinyl Store
                    </h2>
                </div>

                <Link to = "/Signup" className="flex items-center gap-2 text-white drop-shadow-md">
                    <span className="font-medium hidden md:block">don't have an account yet?</span>
                    <div className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform font-bold">
                        <span className="text-lg">Sign up</span>
                        <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-[420px] bg-[#f5ece1]/70 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] p-8 flex flex-col items-center mt-16 md:mt-0">
                
                {/* Header Card */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-px bg-[#a78b71]/50"></div>
                        <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#3e2a1e]">
                            <div className="w-4 h-4 bg-[#dcb38b] rounded-full"></div>
                        </div>
                        <div className="w-16 h-px bg-[#a78b71]/50"></div>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-[#3e2a1e] mb-2">Join the Club</h2>
                    <p className="text-center text-sm text-[#5a4a42] font-medium leading-relaxed">
                        Get the latest updates, exclusive offers,<br/>and more vinyl goodness.
                    </p>
                </div>

                {/* Form Inputs */}
                <form onSubmit = {handleSubmit} className="w-full flex flex-col gap-4 mb-6">
                    

                    {/* Email Address */}
                    <div className="flex items-center w-full bg-white/50 border border-[#d4c4b5] rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#dcb38b] transition-all">
                        <svg className="w-5 h-5 fill-[#8a7a72] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/>
                        </svg>
                        <input 
                            type="email" 
                            placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="w-full bg-transparent outline-none ml-3 text-[#3e2a1e] placeholder-[#8a7a72] font-medium"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center w-full bg-white/50 border border-[#d4c4b5] rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#dcb38b] transition-all">
                        <svg className="w-5 h-5 fill-[#8a7a72] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/>
                        </svg>
                        <input 
                            type={showpassword ? "text" : "password"}
                            placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="w-full bg-transparent outline-none ml-3 text-[#3e2a1e] placeholder-[#8a7a72] font-medium"
                        />
                        <button type="button" onClick={() => setShowpassword(!showpassword)}> {showpassword ? (
                            <svg className="w-5 h-5 fill-[#8a7a72] shrink-0 cursor-pointer hover:fill-[#3e2a1e]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/>
                            </svg> 
                            ) : ( 
                            <svg className="w-5 h-5 fill-[#8a7a72] shrink-0 cursor-pointer hover:fill-[#3e2a1e]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg> 
                            )}
                        </button>
                    </div>
                            
                    <button className="w-full bg-[#dcb38b] hover:bg-[#cba17a] text-[#3e2a1e] font-bold text-lg py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md mb-6">
                        Login
                    </button>

                </form>

                <div className="flex items-center w-full gap-4 mb-6">
                    <div className="h-px bg-[#d4c4b5] flex-1"></div>
                    <span className="text-[#8a7a72] text-sm font-medium">or</span>
                    <div className="h-px bg-[#d4c4b5] flex-1"></div>
                </div>

                <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white/80 p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"/></svg>
                    </button>
                    <button className="w-12 h-12 bg-white/80 p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM420.7 436.9C416.5 436.9 413.9 435.6 410 433.3C347.6 395.7 275 394.1 203.3 408.8C199.4 409.8 194.3 411.4 191.4 411.4C181.7 411.4 175.6 403.7 175.6 395.6C175.6 385.3 181.7 380.4 189.2 378.8C271.1 360.7 354.8 362.3 426.2 405C432.3 408.9 435.9 412.4 435.9 421.5C435.9 430.6 428.8 436.9 420.7 436.9zM447.6 371.3C442.4 371.3 438.9 369 435.3 367.1C372.8 330.1 279.6 315.2 196.7 337.7C191.9 339 189.3 340.3 184.8 340.3C174.1 340.3 165.4 331.6 165.4 320.9C165.4 310.2 170.6 303.1 180.9 300.2C208.7 292.4 237.1 286.6 278.7 286.6C343.6 286.6 406.3 302.7 455.7 332.1C463.8 336.9 467 343.1 467 351.8C466.9 362.6 458.5 371.3 447.6 371.3zM478.6 295.1C473.4 295.1 470.2 293.8 465.7 291.2C394.5 248.7 267.2 238.5 184.8 261.5C181.2 262.5 176.7 264.1 171.9 264.1C158.7 264.1 148.6 253.8 148.6 240.5C148.6 226.9 157 219.2 166 216.6C201.2 206.3 240.6 201.4 283.5 201.4C356.5 201.4 433 216.6 488.9 249.2C496.7 253.7 501.8 259.9 501.8 271.8C501.8 285.4 490.8 295.1 478.6 295.1z"/></svg>
                    </button>
                    <button className="w-12 h-12 bg-white/80 p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}