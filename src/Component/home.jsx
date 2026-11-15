import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Home(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation(); 

    // 1. USE-EFFECT KHUSUS UNTUK MENANGKAP TOKEN GOOGLE
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const refresh = params.get("refresh");
        
        if(token && refresh) {
            localStorage.setItem("access_token", token);
            localStorage.setItem("refresh_token", refresh);

            // Bersihkan URL dari parameter token agar rapi
            navigate("/Home", { replace: true });

            // Reload halaman agar Navbar mendeteksi user sudah login
            window.location.reload();
        }
    }, [location, navigate]);

    // 2. USE-EFFECT UNTUK FETCH DATA PRODUK & KATEGORI
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

    const hot_product = products
        .filter((item) => item.hot)
        .sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));

    if(loading) return <div className="text-center text-2xl font-cinzel text-[#a58141] mt-20">Memuat dari Database...</div>
    if(error) return <div className="text-center text-2xl font-cinzel text-[#a58141] mt-20">Error, terdapat masalah di backend</div>

    return (
        <section className="min-h-screen bg-[#ffffff] font-cinzel">
            <div>
                {/* HERO SECTION */}
                <div className="w-full relative h-[80vh] overflow-hidden flex justify-center items-center">   
                    <img className="w-full h-full absolute inset-0 brightness-50 object-cover object-[center_70%]" src="/header.webp" alt="Header Background"/>
                    
                    <div className="absolute flex flex-col items-center gap-6 text-white z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-center">Providing High-Quality Vinyl</h1>
                        <h3 className="text-2xl md:text-3xl font-bold text-center">Discover curated collection and rare pressings</h3>
                        
                        <div className="flex flex-row gap-4 mt-4">
                            <button onClick={() => navigate('/Home')} className="border-2 border-[#a58141] text-white p-3 px-8 text-xl rounded-full cursor-pointer transition-all duration-300 hover:bg-[#a58141] hover:scale-105">Shop Collection</button>
                            <button onClick={() => navigate('/Signup')} className="border-2 border-[#a58141] text-white p-3 px-8 text-xl rounded-full cursor-pointer transition-all duration-300 hover:bg-[#a58141] hover:scale-105">Become a Member</button>
                        </div>
                    </div>
                </div>

                {/* HOT PRODUCT SECTION */}
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between items-center px-8 text-3xl mt-4">
                    <span className="select-none font-bold">Hot Product!</span>
                </div>
                
                <div className="flex flex-wrap gap-6 p-8 w-full justify-center">
                    {hot_product.map((product) => (
                        <div key={product._id} className="w-[250px] min-w-0 group cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                            
                            <div className="relative aspect-square rounded-3xl bg-white border border-gray-300 shadow-lg hover:shadow-2xl hover:border-[#8B6B4A] transition-all duration-300 flex justify-center overflow-hidden">
                                {product.bestSeller && (
                                    <div className="absolute rounded-full px-4 py-1 bg-[#a58141] text-[#ffffe6] text-sm font-bold -top-1 left-1/2 -translate-x-1/2 z-10 select-none uppercase tracking-widest border-2 border-white shadow-sm mt-4">
                                        Best Seller
                                    </div>
                                )} 
                                <img src={product.cover} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CATEGORY SECTION */}
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between items-center px-8 text-3xl mt-8">
                    <span className="font-bold">Shop by Categories</span>
                    <div className="flex flex-row gap-2 cursor-pointer select-none hover:text-[#8B6B4A] transition">
                        <span>All Categories</span>
                        <svg className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 p-8 justify-center">
                   {categories.slice(0, 5).map((category) => (
                        <div key={category._id} onClick={() => navigate(`/category/${category.name}`)} className="flex flex-col items-center gap-3 cursor-pointer group w-24 md:w-32">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8B6B4A] transition-all duration-300 shadow-md bg-white">
                                <img src={category.imageBanner} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </div>
                            <span className="text-[#a58141] font-bold text-sm tracking-widest uppercase text-center">{category.name}</span>
                        </div>
                   ))}
                </div>
            </div>
        </section>
    );
}