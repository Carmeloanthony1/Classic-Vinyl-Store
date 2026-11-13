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
                localStorage.setItem("token", data.token);
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"/></svg>
                    </button>
                    <button className="w-12 h-12 bg-white/80 p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M524.5 133.8C524.3 133.5 524.1 133.2 523.7 133.1C485.6 115.6 445.3 103.1 404 96C403.6 95.9 403.2 96 402.9 96.1C402.6 96.2 402.3 96.5 402.1 96.9C396.6 106.8 391.6 117.1 387.2 127.5C342.6 120.7 297.3 120.7 252.8 127.5C248.3 117 243.3 106.8 237.7 96.9C237.5 96.6 237.2 96.3 236.9 96.1C236.6 95.9 236.2 95.9 235.8 95.9C194.5 103 154.2 115.5 116.1 133C115.8 133.1 115.5 133.4 115.3 133.7C39.1 247.5 18.2 358.6 28.4 468.2C28.4 468.5 28.5 468.7 28.6 469C28.7 469.3 28.9 469.4 29.1 469.6C73.5 502.5 123.1 527.6 175.9 543.8C176.3 543.9 176.7 543.9 177 543.8C177.3 543.7 177.7 543.4 177.9 543.1C189.2 527.7 199.3 511.3 207.9 494.3C208 494.1 208.1 493.8 208.1 493.5C208.1 493.2 208.1 493 208 492.7C207.9 492.4 207.8 492.2 207.6 492.1C207.4 492 207.2 491.8 206.9 491.7C191.1 485.6 175.7 478.3 161 469.8C160.7 469.6 160.5 469.4 160.3 469.2C160.1 469 160 468.6 160 468.3C160 468 160 467.7 160.2 467.4C160.4 467.1 160.5 466.9 160.8 466.7C163.9 464.4 167 462 169.9 459.6C170.2 459.4 170.5 459.2 170.8 459.2C171.1 459.2 171.5 459.2 171.8 459.3C268 503.2 372.2 503.2 467.3 459.3C467.6 459.2 468 459.1 468.3 459.1C468.6 459.1 469 459.3 469.2 459.5C472.1 461.9 475.2 464.4 478.3 466.7C478.5 466.9 478.7 467.1 478.9 467.4C479.1 467.7 479.1 468 479.1 468.3C479.1 468.6 479 468.9 478.8 469.2C478.6 469.5 478.4 469.7 478.2 469.8C463.5 478.4 448.2 485.7 432.3 491.6C432.1 491.7 431.8 491.8 431.6 492C431.4 492.2 431.3 492.4 431.2 492.7C431.1 493 431.1 493.2 431.1 493.5C431.1 493.8 431.2 494 431.3 494.3C440.1 511.3 450.1 527.6 461.3 543.1C461.5 543.4 461.9 543.7 462.2 543.8C462.5 543.9 463 543.9 463.3 543.8C516.2 527.6 565.9 502.5 610.4 469.6C610.6 469.4 610.8 469.2 610.9 469C611 468.8 611.1 468.5 611.1 468.2C623.4 341.4 590.6 231.3 524.2 133.7zM222.5 401.5C193.5 401.5 169.7 374.9 169.7 342.3C169.7 309.7 193.1 283.1 222.5 283.1C252.2 283.1 275.8 309.9 275.3 342.3C275.3 375 251.9 401.5 222.5 401.5zM417.9 401.5C388.9 401.5 365.1 374.9 365.1 342.3C365.1 309.7 388.5 283.1 417.9 283.1C447.6 283.1 471.2 309.9 470.7 342.3C470.7 375 447.5 401.5 417.9 401.5z"/></svg>
                    </button>
                </div>

            </div>
        </div>
    );
}