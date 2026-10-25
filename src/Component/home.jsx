import React, { useState, useEffect } from "react";
export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockdata = [
        {
            "id": "mj-number-ones",
            "artist": "Michael Jackson",
            "title": "Number Ones",
            "cover": "https://placehold.co/400x400/f8f9fa/a58141?text=MJ",
            "price": 450000,
            "hot": true,
            "bestSeller": true
        },
        {
            "id": "queen-greatest-hits-2",
            "artist": "Queen",
            "title": "Greatest Hits II",
            "cover": "https://placehold.co/400x400/f8f9fa/a58141?text=Queen",
            "price": 420000,
            "hot": true,
            "bestSeller": true
        },
        {
            "id": "elvis-golden-records",
            "artist": "Elvis Presley",
            "title": "Elvis' Golden Records",
            "cover": "https://placehold.co/400x400/f8f9fa/a58141?text=Elvis",
            "price": 400000,
            "hot": true,
            "bestSeller": false
        },
        {
            "id": "ewf-best-of-vol-1",
            "artist": "Earth, Wind & Fire",
            "title": "The Best of Earth, Wind & Fire Vol. 1",
            "cover": "https://placehold.co/400x400/f8f9fa/a58141?text=EWF",
            "price": 430000,
            "hot": true,
            "bestSeller": false
        },
        {
            "id": "abba-gold",
            "artist": "ABBA",
            "title": "Gold: Greatest Hits",
            "cover": "https://placehold.co/400x400/f8f9fa/a58141?text=ABBA",
            "price": 440000,
            "hot": true,
            "bestSeller": false
        }
    ];

    useEffect(() => {
        setProducts(mockdata);
        setLoading(false);
    }, []);

    if(loading) return <div className="p-10 text-center">Loading...</div>

    const hot_product = products.filter((item) => item.hot);
    const best_product = products.filter((item) => item.bestSeller);

    return (
        <section className="min-h-screen bg-[#ffffff] font-cinzel">
            <div className="p-8">
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between p-8 text-3xl">
                    <span className="select-none">Hot Product!</span>
                    <div className="flex flex-row gap-2 cursor-pointer cursor-pointer select-none">
                        <span>Look more</span>
                        <svg className = "w-7 h-7" fill="#a58141" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-8 p-8 w-full justify-content">
                    {hot_product.map((products) => (
                        <div key={products._id} className="flex-1 min-w-0 group cursor-pointer">
                            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-300 shadow-lg hover:shadow-2xl hover:border-[#8B6B4A] transition-all duration-300">
                                <img src={products.cover} alt = {products.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}