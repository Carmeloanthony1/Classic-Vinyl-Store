import React, { useState } from "react";

export default function Search(){
    return (
        <div className="border-2 border-[#a58141] rounded-xl flex justify-center items-center margin-0">
            <input className = "text-2xl" type="text" placeholder="Search an album..." />
        </div>
    );
}