import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search(){
    const [search_params, setSearch_params] = useSearchParams();
    const [search, setSearch] = useState(search_params.get("search") || "");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if((value.trim)() !== ""){
            //trim => ngehapus spasi
            setSearch_params({ search: value });
        } else {
            setSearch_params({}); //kalau input kosong, maka searchnya juga kosong
        }
    };

    return (
        <div className="w-full flex justify-center p-4">
            <div className="border-2 border-[#a58141] rounded-xl flex justify-center items-center margin-0">
                <input className = "text-2xl p-2 outline-none" type="text" placeholder="Search an album..." value={search} onChange={handleInputChange}/>
            </div>
        </div>
    );
}