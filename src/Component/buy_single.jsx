import React, { useState, useEffect, use } from "react";
import { Navigate, useParams } from "react-router-dom";
const payment_method = [
    { id: "bca", name: "Transfer BCA", account: "" },
    { id: "qris", name: "QRIS", img: "" }, 
    { id: "gopay", name: "Transfer Gopay", account: ""}
];

export default function BuySingle(){
    const [selected_payment, setSelected_payment] = useState();
    const [order, setOrder] = useState();
    const { id, order_id } = useParams();
    const quantity = location.state?.quantity || 1;
    //pengaman jadi quantity nya di hitung dari yang componen sebelumnya atau auto set 1
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_product = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                if(response.ok){
                    const data = await response.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Gagal mengambil data produk", error);
            } finally {
                setLoading(false);
            }
        };
        fetch_product();
    }, [id]);

    if (loading) return <div className="text-black text-center mt-20 text-2xl">Memuat data...</div>;
    if (!product) return <div className="text-black text-center mt-20 text-2xl">Produk tidak ditemukan.</div>;

    const totalprice = product.price * quantity;

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            <img className = "absolute w-full h-full inset-0 z-0" src="/background_payment.webp"/>
            <div className="bg-[#dfb58d] rounded-xl flex flex-col z-10 w-[55%]">
                <div className="flex flex-col">
                    <div className="bg-[#dfb58d] rounded-xl flex flex-row p-5 items-center justify-between">
                        <div className="flex flex-row items-center gap-4">
                            <img className="w-24 h-24 object-cover bg-white rounded-lg p-1" src="/logo.png" alt="logo"/>
                            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">Classic Vinyl Store</h2>
                        </div>
                        <button onClick={() => navigate("/Home")}>
                            <svg className="w-8 h-8 fill-white cursor-pointer hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="bg-[#ffffff] flex flex-col rounded-xl w-full w-[55%] shadow-2xl p-4">
                        <div className="bg-[#fee7d1] rounded-xl text-black p-3 flex flex-col gap-2">
                            <h2 className="font-bold text-3xl">Total</h2>
                            <h1 className="font-bold text-4xl">Rp {totalprice.toLocaleString('id-ID')}</h1>
                            <p className="text-xl">Order ID : {order_id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
}
