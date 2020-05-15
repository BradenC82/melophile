import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Card from '../Card';




export default function Dashboard() {

    const [name, setName] = useState('');
    const [tracks, setTracks] = useState([]);
    const [trackFeatures, setTrackFeatures] = useState([]);

    useEffect(() => {
        let parsed = queryString.parse(window.location.search.slice(1));
        let accessToken = parsed.access_token;

        console.log(accessToken);

        axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => {
            if (response) {
                setName(response.data.display_name)
            }
        }
        )

        axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => {
            if (response) {
                setTracks(response.data.items)

                let trackIDS = response.data.items.map(trackData => trackData.track.id)

                axios.get('https://api.spotify.com/v1/audio-features/?ids=' + trackIDS.join(','), {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                }).then(response => {
                    if (response) {
                        setTrackFeatures(response.data.audio_features);
                    }
                })
            }
        }
        )

    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="font-bold text-3xl">Liked Songs</h1>
            <ul className="">
                {tracks.map((track,index) => {
                    return (
                        <li key={track.track.id} className="my-4"><Card trackData={track} trackFeatureData={trackFeatures.length?trackFeatures[index]:0} /></li>
                    )
                })}
            </ul>

        </div>
    )
}
