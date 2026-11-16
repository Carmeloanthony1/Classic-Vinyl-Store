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

}