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
                const response = await fetch(`http://localhost:8000/api/products/${id}/songs`);

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
    if (loading) return <p className="text-gray-400 text-sm">Memuat lagu...</p>;
    if (error) return <p className="text-red-500 text-sm">Gagal mengambil lagu.</p>;
    if (song.length === 0) return <p className="text-gray-400 text-sm">Belum ada lagu di album ini.</p>;
    return (
        <div className="border-2 border-[#000000] rounded-xl max-w-[80%] w-full p-3">
            <h2 className="text-[#000000] font-bold text-3xl flex items-center justify-center p-2">Track list</h2>
            <ul className="max-h-120 overflow-y-auto text-[#000000] flex flex-col gap-3 p-3">
                {song.map((lagu, index) => (
                    <li key = {lagu._id} className="border-2 p-2 text-xl rounded-md">
                        <div>
                            <span>{index + 1}. </span>
                            <span>{lagu.title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
