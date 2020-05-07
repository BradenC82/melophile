import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

export default function Dashboard() {
    
    const [name,setName] = useState('');
    const [tracks, setTracks] = useState('');

    useEffect(() => {
        let parsed = queryString.parse(window.location.search.slice(1));
        let accessToken = parsed.access_token;
        
        console.log(accessToken);
        
        axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => {
            if(response){
                setName(response.data.display_name)
            }
        }
        )

        axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => {
            if(response){
                setTracks(response.data.items)
            }
        }
        )

    },[])
    
    return (
        <div>
            Dashboard
            <p>{name}</p>
        </div>
    )
}
