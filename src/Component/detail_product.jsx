import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState("1");

    useEffect(() => {
        const fetch_detail = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Terdapat masalah saat ingin mengambil data detail produk");
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
        <div id = "detail" className="bg-[#ffffff] w-full min-h-screen p-4 flex flex-col justify-center items-center">
            <div className="bg-[#313131] pl-8 pr-8 w-[90%] h-[85vh] rounded-xl">
                <div className="p-4">
                    <div className="mb-4">
                        <Link to="/">
                            <svg className = "flex-2 w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="bg-[#ffffff] flex-1 w-full rounded-xl overflow-y-auto">
                        <div className="flex flex-col md:flex-row  gap-8 h-full">
                            <div className="w-full md:w-[35%] flex items-center justify-center md:p-12">
                                <img className = "w-145 h-145 object-contain" src={product.cover}/>
                            </div>
                            <div className="flex-1 flex flex-col rounded-xl w-[80%] w-full text-black bg-[#ffffff] pt-12 pb-12 gap-4">
                                <h1 className="text-4xl font-bold">{product.title}</h1>
                                <h3 className="border-2 p-8 rounded-lg w-fit text-4xl font-bold">Rp {product.price}</h3>
                                <h3 className="text-2xl font-bold">Potongan</h3>
                                <h3 className="text-2xl font-bold">Artist : {product.artist}</h3>
                                <h3 className="flex flex-row text-2xl font-bold gap-3 items-center">Kuantitas : 
                                    <div className="flex flex-row">
                                        <button className="p-3 bg-[#dfb58d]">-</button>
                                        <span className="p-2 pl-8 pr-8 bg-[#ffffff]">{quantity}</span>
                                        <button className="p-3 bg-[#dfb58d]">+</button>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}