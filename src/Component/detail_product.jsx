import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState(1);

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

    const tambah = () =>  {
        setQuantity(quantity + 1);
    }

    const kurang = () => {
        if(quantity <= 1){
            alert("Tidak bisa mengurangi produk hingga kurang dari 1");
        } else {
            setQuantity(quantity - 1);
        }
    }

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
                        <div className="flex flex-col md:flex-row gap-8 h-full items-center">
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
                                        <button onClick = {kurang} className="p-3 bg-[#dfb58d]">-</button>
                                        <span className="p-2 pl-8 pr-8 bg-[#ffffff]">{quantity}</span>
                                        <button onClick = {tambah} className="p-3 bg-[#dfb58d]">+</button>
                                    </div>
                                </h3>
                                <div className="flex flex-row gap-10 w-full max-w-lg mt-auto pt-4">
                                    <button className="flex-1 flex flex-row justify-center rounded-md gap-2 items-center bg-[#dfb58d] color-[#000000] p-3 font-bold hover:bg-[#cda37b] duration-300">
                                        <svg className="w-6 h-6"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                            <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
                                        </svg>
                                        <h3>Masukan Keranjang</h3>
                                    </button>
                                    <button className="flex-1 flex-row items-center bg-[#dfb58d] font-bold rounded-md p-3 hover:bg-[#cda37b] duration-300">
                                        <h3>Beli Sekarang</h3>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}