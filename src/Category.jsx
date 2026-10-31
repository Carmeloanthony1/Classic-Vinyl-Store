import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "./Component/searchbar";
export default function Category(){
    const { category } = useParams();
    const [product_categories, setProduct_categories] = useState([]);
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch_product = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products?category=${category}`);
                if(!response.ok){
                    throw new Error ("gagal mengambil dari database");
                }

                const data_product = await response.json();
                setProduct_categories(data_product);
            } catch (error){
                console.log("Terdapat masalah saat melakukan fetch category :", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetch_product();
    }, [category]);
    return (
        <div className="w-full min-h-screen flex flex-col gap-8 p-8 font-cinzel text-[#a58141] bg-[#ffffff]">
            <div className="flex flex-row justify-between">
                <h1 className="text-4xl">Category : {category}</h1>
                <Search/>
                <div></div>
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