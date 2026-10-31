import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selected_category, setSelected_category] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch_products = async () => {
            try {
                const [response_product, response_categories] = await Promise.all([
                    fetch('http://localhost:8000/api/products'),
                    fetch('http://localhost:8000/api/categories')
                ]);

                if(!response_product.ok || !response_categories.ok){
                    throw new Error("Gagal mengambil dari database");
                }

                const data_product = await response_product.json();
                const data_categories = await response_categories.json();
                setProducts(data_product);
                setCategories(data_categories);
                
            } catch (err) {
                console.error("Terdapat masalah saat melakukan fetch product :", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetch_products();
    }, []);
    //[] disini itu untuk bikin function jalan sekali setiapkali web di buka 

    const hot_product = products
        .filter((item) => item.hot)
        .sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));

    const best_product = products.filter((item) => item.bestSeller);
    const regular_product = products.filter((item) => !item.bestSeller);
    

    if(loading) return <div className="text-center text-2xl font-cinzel text-[#a58141]">Memuat dari Database</div>
    if(error == true) return <div className="text-center text-2xl font-cinzel text-[#a58141]">Error, terdapat masalah di backend</div>

    return (
        <section className="min-h-screen bg-[#ffffff] font-cinzel">
            <div className="p-8">
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between p-8 text-3xl">
                    <span className="select-none">Hot Product!</span>
                    <div className="flex flex-row gap-2 cursor-pointer cursor-pointer select-none">
                        <span>Look more</span>
                        <svg className = "w-7 h-7" fill="#a58141" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-8 p-8 w-full justify-content">
                    {hot_product.map((products) => (
                        <div key={products._id} className="flex-1 min-w-0 group cursor-pointer">
                            
                            <div className="relative aspect-square p-8 rounded-3xl bg-white border border-gray-300 shadow-lg hover:shadow-2xl hover:border-[#8B6B4A] transition-all duration-300 flex justify-center">
                                {products.bestSeller && (
                                    <div className="absolute rounded-2xl p-2 bg-[#a58141] text-[#ffffe6] -top-3 left-1/2 -translate-x-1/2 z-3 select none">Best Seller</div>
                                )} 
                                <img src={products.cover} alt = {products.title} className="w-full h-full object-cover group-hover:scale-105 transition rounded-xl duration-500 overflow-hidden " />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between p-8 text-3xl">
                    <span>Shop by Categories</span>
                    <div className="flex flex-row gap-2 cursor-pointer cursor-pointer select-none">
                        <span>All Categories</span>
                        <svg className = "w-7 h-7" fill="#a58141" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-8 p-8">
                   {categories.slice(0, 5).map((category) => (
                        <div key = {category.id} onClick={() => navigate(`/category/${category.name}`)}
                            className="flex flex-row items-center gap-3 p-8 cursor-pointer border border-gray-300  hover:shadow-2xl hover:border-[#8B6B4A] rounded-xl group bg-[#ffffff]">
                            <img src={category.imageBanner} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 shadow-lg group-hover:scale-110 transition rounded-xl" />
                        </div>
                   ))}
                </div>
            </div>
        </section>
    );
}