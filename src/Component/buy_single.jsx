import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 

const payment_method = [
    { id: "bca", name: "Transfer BCA", description: "Transfer melalui rekening BCA", img: "https://i.pinimg.com/736x/ed/a9/aa/eda9aabed661a98d62c5df2df6879258.jpg" },
    { id: "qris", name: "QRIS", description: "Scan QR menggunakan e-wallet", img: "https://pojoksiar.com/wp-content/uploads/2025/08/quick-response-code-indonesia-standard-qris-logo-png_seeklogo-391791.png" }, 
    { id: "gopay", name: "Gopay", description: "Bayar instan menggunakan gopay", img: "https://images.seeklogo.com/logo-png/36/1/gopay-logo-png_seeklogo-369813.png" }
];

export default function BuySingle(){
    const { id, order_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 
    
    // Ambil quantity dari halaman sebelumnya
    const quantity = location.state?.quantity || 1;

    const [selected_payment, setSelected_payment] = useState("bca"); 
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
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 font-sans">
            <img className="absolute w-full h-full inset-0 z-0 object-cover" src="/background_payment.webp" alt="background"/>
            
            {/* PERBAIKAN: Bersihkan class w-[55%] w-full yang bentrok */}
            <div className="bg-[#fcf9f2] rounded-3xl flex flex-col z-10 w-full max-w-lg shadow-2xl overflow-hidden">
                
                {/* Header Modal */}
                <div className="bg-[#dfb58d] flex flex-row p-5 items-center justify-between">
                    <div className="flex flex-row items-center gap-4">
                        <img className="w-16 h-16 object-contain bg-white rounded-lg p-1" src="/logo.png" alt="logo"/>
                        <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">Classic Vinyl Store</h2>
                    </div>
                    <button onClick={() => navigate("/Home")}>
                        <svg className="w-8 h-8 fill-white cursor-pointer hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/>
                        </svg>
                    </button>
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-6">
                    
                    <div className="bg-[#fee7d1] rounded-xl text-black p-4 flex flex-col gap-1 border border-[#f0d8bc]">
                        <h2 className="font-bold text-lg text-gray-600">Total Pembayaran</h2>
                        <h1 className="font-bold text-3xl">Rp {totalprice.toLocaleString('id-ID')}</h1>
                        <p className="text-sm text-gray-500 mt-1">Order ID : {order_id}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Metode Pembayaran</h1>
                            <h3 className="text-sm text-gray-500">Pilih metode pembayaran yang ingin dilakukan</h3>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            {payment_method.map((method) => (
                                <label 
                                    key={method.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 ${
                                        selected_payment === method.id 
                                        ? "border-[#dfb58d] bg-[#dfb58d]/10" 
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                    }`}
                                >
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value={method.id}
                                        checked={selected_payment === method.id}
                                        onChange={(e) => setSelected_payment(e.target.value)}
                                        className="w-5 h-5 accent-[#dfb58d]"
                                    />
                                    
                                    <img src={method.img} alt={method.name} className="w-16 h-10 object-contain bg-white rounded p-1 border" />
                                    
                                    <div>
                                        <p className="font-bold text-gray-900">{method.name}</p>
                                        <p className="text-sm text-gray-500">{method.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => alert(`Lanjut ke pembayaran via ${selected_payment}`)}
                        className="w-full bg-[#dfb58d] hover:bg-[#cda37b] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg mt-2"
                    >
                        Bayar Sekarang
                    </button>

                </div>
            </div>
        </div>
    );  
}