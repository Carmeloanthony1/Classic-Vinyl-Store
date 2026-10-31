import React, { useEffect, useState } from "react";

export default function Category(){
    const [product_categories, setProduct_categories] = useState([]);
    const [selected_categories, setSelected_categories] = useState("All");
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch_product = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if(!response.ok){
                    throw new error ("gagal mengambil dari database");
                }

                const data_product = await response.json();
                setProduct_categories(data_product);
            } catch (error){
                console.log("Terdapat masalah saat melakukan fetch category :", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetch_product();
    }, []);
    return (
        <div>
            <h1>Category</h1>
            <ul>{product_categories.map((product) => (
                <span>{product.title}</span>
            ))}</ul>
        </div> 
    );
}