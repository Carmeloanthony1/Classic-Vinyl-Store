import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function list_song(){
    const { id } = useParams();
    const [song, setSong] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch_song = await fetch(`http://localhost:8000/api/products/${id}`)
    })
    return ();
}
