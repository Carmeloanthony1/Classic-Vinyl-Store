import React, { useEffect, useState } from "react";

export default function Category(){
    const [categories, setCategories] = useState([]);
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
                setCategories(data_product);
            } catch (error){
                console.log("Terdapat masalah saat melakukan fetch category :", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetch_product();
    });
}