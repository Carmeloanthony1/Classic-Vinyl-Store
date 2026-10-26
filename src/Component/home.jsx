import React, { useState, useEffect } from "react";
export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockdata = [
        {
            "id": "mj-number-ones",
            "artist": "Michael Jackson",
            "title": "Number Ones",
            "cover": "https://thumb.wikimedia.org/wikipedia/en/thumb/b/b3/MichaelsNumberOnes.JPG/250px-MichaelsNumberOnes.JPG?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
            "price": 450000,
            "category": "Pop",
            "hot": true,
            "bestSeller": true
        },
        {
            "id": "queen-greatest-hits-2",
            "artist": "Queen",
            "title": "Greatest Hits II",
            "cover": "https://i.scdn.co/image/ab67616d0000b2733db35792fa2e91722e9897b1",
            "price": 420000,
            "category": "Rock",
            "hot": true,
            "bestSeller": true
        },
        {
            "id": "elvis-golden-records",
            "artist": "Elvis Presley",
            "title": "Elvis' Golden Records",
            "cover": "https://upload.wikimedia.org/wikipedia/en/9/9d/ElvisGoldenRecordsLPCover.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
            "price": 400000,
            "category": "Rock and Roll",
            "hot": true,
            "bestSeller": false
        },
        {
            "id": "ewf-best-of-vol-1",
            "artist": "Earth, Wind & Fire",
            "title": "The Best of Earth, Wind & Fire Vol. 1",
            "cover": "https://upload.wikimedia.org/wikipedia/en/9/95/BestofEarthWind%26Fire.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
            "price": 430000,
            "category": "R&B / Soul",
            "hot": true,
            "bestSeller": false
        },
        {
            "id": "abba-gold",
            "artist": "ABBA",
            "title": "Gold: Greatest Hits",
            "cover": "https://www.sweelee.co.id/cdn/shop/files/products_2FFLS-VINH-BD-0600753511060_2FFLS-VINH-BD-0600753511060_1745831727930_grande.jpg?v=1748177757",
            "price": 440000,
            "category": "Pop",
            "hot": true,
            "bestSeller": false
        }
    ];

    const genre = [
        {
            
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
                            
                            <div className="relative aspect-square p-8 rounded-3xl bg-white border border-gray-300 shadow-lg hover:shadow-2xl hover:border-[#8B6B4A] transition-all duration-300 flex justify-center">
                                {products.bestSeller && (
                                    <div className="absolute rounded-2xl p-2 bg-[#a58141] text-[##ffffe6] -top-3 left-1/2 -translate-x-1/2 z-3 select none">Best Seller</div>
                                )} 
                                <img src={products.cover} alt = {products.title} className="w-full h-full object-cover group-hover:scale-105 transition rounded-xl duration-500 overflow-hidden " />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-20 text-[#a58141] flex flex-row justify-between p-8 text-3xl">
                    <span>Shop by Categories</span>
                    <div className="flex flex-row gap-2 cursor-pointer cursor-pointer select-none">
                        <span>All Categories</span>
                        <svg className = "w-7 h-7" fill="#a58141" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}