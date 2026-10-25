import React from "react";
export default function Nav(){

  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 bg-[#ffffe6] border-b border-[#CBA052]/20 text-[#F5F1E1] font-cinzel select-none">
      <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
        <img className = "w-12 h-12 object-cover border-2 border-[#a58141] rounded-full" src="/logo.png" alt="logo"/>
        <span className="text-[#a58141] font-bold">Classic Vinyl Store</span>
      </div>
      <ol className="flex flex-row items-center space-x-46 text-xl">
        <li className="text-[#a58141] font-bold cursor-pointer">Product</li>
        <li className="text-[#a58141] font-bold cursor-pointer">About</li>
        <li className="text-[#a58141] font-bold cursor-pointer">Order</li>
      </ol>
      <button className="border-2 border-[#a58141] rounded-full text-[#a58141] font-bold cursor-pointer p-2 py-2">Contact us</button>
    </nav>
  );
}
