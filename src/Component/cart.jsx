import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Cart(){
    const navigate = useNavigate();
    const [cart_items, setCart_items] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const saved_cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart_items(saved_cart.map(item => ({ ...item, selected: true })));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart_items));
    }, [cart_items, isMounted]);
return(
    <div className="w-full h-screen p-16">
        <img className= "fixed inset-0 w-full h-full object-cover -z-10 opacity-65" src="/background_payment.webp" />
        <div className="w-full flex flex-rows bg-[#ffffe4] rounded-lg">
            <div className="w-full flex justify-between text-black p-4">
                <h1 className="text-2xl font-bold">Your shopping cart</h1>
                <div className="flex flex-rows items-center gap-2">
                    <svg className= "w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z"/>
                    </svg>
                    <h2 className="text-2xl font-bold">Back</h2>
                </div>
            </div>
        </div>
    </div>
);
}