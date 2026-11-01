import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Search from "./Component/searchbar";
export default function Category(){
    const { category } = useParams();
    const [product_categories, setProduct_categories] = useState([]);
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(false);
    const [search_params, setSearch_params] = useSearchParams();

    useEffect(() => {
        const fetch_product = async () => {
            const raw_search = search_params.get("search");
            const value = (!raw_search || raw_search === "null") ? "" : raw_search;
            try {
                const response = await fetch(`http://localhost:8000/api/products?category=${category}&search=${value}`); //? itu maksudnya di lakukan ngga
                if(!response.ok){
                    throw new Error("Terdapat masalah saat melakukan fetch data");
                }
                const data = await response.json();
                setProduct_categories(data);
            } catch (error){
                setError(true);
                console.error("Terdapat error saat ingin melakukan fetch", error);
            } 
        };
        fetch_product();
    }, [category, search_params]);
    return (
        <div className="w-full min-h-screen flex flex-col gap-8 p-8 font-cinzel text-[#a58141] bg-[#ffffff]">
            <div className="grid grid-cols-3 items-center w-full">
                <h1 className="text-4xl justify-self-start">Category : {category}</h1>
                <div className="flex justify-self-center w-full">
                    <Search/>
                </div>
            </div>
            <div>
            <ul className="grid grid-cols-4">{product_categories.map((product) => (
                <li key={product._id} className="flex justify-center items-center margin-0 mb-24 gap-3 flex-col">
                    <div className="border border-gray-300 p-4 rounded-xl hover:scale-105 hover:shadow-2xl hover:border-[#8B6B4A] duration-300">
                        <img className = "w-80 h-80" src={product.cover}/>
                    </div>
                </li>
            ))}
            </ul>
            </div>

        </div> 
    );
}