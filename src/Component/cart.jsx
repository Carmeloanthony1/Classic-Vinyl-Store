import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Cart(){
    const navigate = useNavigate();
    const [cart_items, setCart_items] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [ischecked, setIschecked] = useState(false);
    useEffect(() => {
        const saved_cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart_items(saved_cart.map(item => ({ 
            ...item, 
            selected: item.selected ?? true, 
            quantity: item.quantity || item.qty || 1
         })));
    }, []);

    const sync_cart = (updated) => {
        setCart_items(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };
    
    const handleremove = (id) => {
        const updated = cart_items.filter(item => (item._id || item.id) !== id);
        sync_cart(updated);
    }
  
    const totalharga = cart_items
        .filter(item => item.selected)
        .reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
return(
    <div className="w-full h-screen p-16 flex justify-center items-center">
        <img className= "fixed inset-0 w-full h-full object-cover -z-10 opacity-65" src="/background_payment.webp" />
        <div className="w-full max-w-[90%] mx-auto flex flex-col bg-[#ffffe4] rounded-lg">
            <div className="w-full flex justify-between text-black p-4">
                <h1 className="text-2xl font-bold">Your shopping cart</h1>
                <div className="flex flex-rows items-center gap-4">
                    <svg className= "w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z"/>
                    </svg>
                    <h2 className="text-2xl font-bold">Back</h2>
                </div>
            </div>
            {cart_items.length === 0 ? (
                <p className="py-8 text-center font-bold font-medium text-2xl text-black h-[80vh] flex items-center justify-center -mt-12">Keranjang masih kosong</p>
            ) : ( 
                <div className="flex flex-col gap-4">
                    {cart_items.map((item) => {
                        const itemID = item._id || item.id;
                        return (
                            <div key={itemID} className="flex items-center justify-between border-b border-black/15 pb-4 gap-4 px-12">
                                <input type="checkbox" checked={ischecked} className="w-12 h-12 border-[#a58141] cursor-pointer"/>
                                <div className="flex items-center gap-4 px-12">
                                    <img src={item.cover || item.image} className="w-48 h-48 object-cover rounded" />
                                </div>
                                <div className="flex-1 grid grid-cols-3 items-center gap-4 text-black text-center">
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <h2 className="font-bold text-lg">{item.artist}</h2>
                                    <p className="font-semibold">Rp {Number(item.price).toLocaleString("id-ID")}</p>
                                </div>
                                <button 
                                    type="button" onClick={() => handleremove(item._id || item.id)}
                                    className="w-15 h-15 fill-black mr-5"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/>
                                    </svg>
                                </button>
                            </div>
                            
                        )
                    })}
                </div>
            )}
        </div>
    </div>
);
}