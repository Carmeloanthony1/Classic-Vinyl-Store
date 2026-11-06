import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function List_song(){
    const { id } = useParams();
    const [song, setSong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch_song = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api//products/${id}/songs`);

                if (!response.ok){
                    throw new Error("Gagal mengambil data lagu");
                }

                const data = await response.json();
                setSong(data);
            } catch (error) {
                setError(true);
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetch_song( );
    }, [id]);
    return ();
}
