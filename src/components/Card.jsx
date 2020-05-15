import React, {useState} from 'react';
import StatRow from './StatRow';

import { ReactComponent as PlayIcon } from '../assets/icons/play.svg';
import { ReactComponent as PauseIcon } from '../assets/icons/pause.svg';

export default function Card(props) {

    const [playing, setPlaying] = useState(false);

    const togglePlaying = () => {
        setPlaying(prevState => !prevState)
    }

    return (
        <div className="w-full flex flex-col border-2 bg-white rounded-lg p-6" >

            <div className="flex  pb-2">
                {
                    playing?<PauseIcon className="h-12 w-12" onClick={togglePlaying}/>:<PlayIcon className="h-12 w-12" onClick={togglePlaying}/>
                }
                <div className="ml-2 h-16" style={{overflow:'hidden'}}>
                    <h2 className='block text-lg leading-tight font-semibold text-gray-900' style={{  whiteSpace: 'nowrap'}}>{props.trackData.track.name}</h2>
                    <p className='mt-2 text-gray-600' style={{  whiteSpace: 'nowrap'}}>{props.trackData.track.artists.map((artist) => artist.name).join(', ')}</p>
                </div>
            </div>


            <div className="flex flex-col w-full">
                <StatRow color="bg-red-500" stat={props.trackFeatureData.danceability}></StatRow>
                <StatRow color="bg-green-500" stat={props.trackFeatureData.energy}></StatRow>
                <StatRow color="bg-purple-500" stat={props.trackFeatureData.speechiness}></StatRow>
                <StatRow color="bg-orange-500" stat={props.trackFeatureData.acousticness}></StatRow>
                <StatRow color="bg-blue-500" stat={props.trackFeatureData.instrumentalness}></StatRow>
                <StatRow color="bg-yellow-500" stat={props.trackFeatureData.liveness}></StatRow>
            </div>



        </div >
    )
}
