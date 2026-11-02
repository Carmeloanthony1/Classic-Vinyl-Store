import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch_detail = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Terdapat masalah saat ingin mengambil data detail produk", Error);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(true);
                console.error("Error fetching detail", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetch_detail();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-[#a58141]">Loading bro</div>;
    if (error || !product) return <div className="p-8 text-center text-red-500">Produk tidak ditemukan!</div>;
    return(
        <div id = "detail" className="bg-[#ffffff] w-full h-screen p-4 pt-8 pb-8 flex flex-col justify-center align items-center">
            <div className="bg-[#313131] w-[90%] h-[100vh] rounded-xl">
                <div className="p-4">
                    <svg className = "w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z"/>
                    </svg>
                    <div>
                        <img src={product.cover} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}