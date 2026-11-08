import React, { useState, useEffect } from "react";
const payment_method = [
    { id: "bca", name: "Transfer BCA", account: "" },
    { id: "qris", name: "QRIS", img: "" }, 
    { id: "gopay", name: "Transfer Gopay", account: ""}
];

export default function BuySingle(){
    const [selected_payment, setSelected_payment] = useState();
    return (
        <div className="w-full h-screen">
            <img src="/background_payment.webp"/>
        </div>
    );
}
