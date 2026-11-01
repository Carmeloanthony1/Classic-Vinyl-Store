import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search(){
    const [search_params, setSearch_params] = useSearchParams();
    const [search, setSearch] = useState(search_params.get("search"));
    const [data_filter, setData_filter] = ([]);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch_params(value);

        if((value.trim)() !== ""){
            //trim => ngehapus spasi
            setSearch_params({search: value });
        } else {
            setSearch_params({}); //kalau input kosong, maka searchnya juga kosong
        }
    };

    useEffect(() => {
        const fetch_product = async () => {
            const value = search_params.get("search");
            try {
                const response = await fetch('http://localhost:8000/api/products?search=${value}'); //? itu maksudnya di lakukan ngga
                if(!response.ok){
                    throw new Error("Terdapat masalah saat melakukan fetch data");
                }
                const data = await response.json();
                setData_filter(data);
            } catch (error){
                setError(true);
                console.error("Terdapat error saat ingin melakukan fetch", error);
            } 
        };
        fetch_product();
    }, [search_params]);

    return (
        <div className="w-full flex justify-center p-4">
            <div className="border-2 border-[#a58141] rounded-xl flex justify-center items-center margin-0">
                <input className = "text-2xl p-2 outline-none" type="text" placeholder="Search an album..." value={search} onChange={handleInputChange}/>
            </div>
        </div>
    );
}