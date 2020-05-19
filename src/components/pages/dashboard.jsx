import React, { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../../services/SpotifyContext";
import axios from "axios";
import queryString from "query-string";
import Card from "../Card";
import BottomNav from "../BottomNav";

export default function Dashboard() {
  const { spotifyApi, setNowPlaying, isPlaying, setIsPlaying } = useContext(
    SpotifyContext
  );

  const [tracks, setTracks] = useState([]);
  const [trackIds, setTrackIds] = useState([]);

  const [featureState, setFeatureState] = useState({});
  const [sortDirection, setSortDirection] = useState("none");
  const [activeFeature, setActiveFeature] = useState("");

  useEffect(() => {
    let parsed = queryString.parse(window.location.search.slice(1));
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    console.log(spotifyApi);
    spotifyApi.getMySavedTracks().then((response) => {
      
      let tracks = response.body.items;

      let trackIDS = response.body.items.map((trackData) => trackData.track.id);
      setTrackIds(trackIDS);
      spotifyApi.getAudioFeaturesForTracks(trackIDS).then((response) => {
        let trackFeatures = response.body.audio_features;

        setTracks(tracks.map((track,index)=>{
          return {
            track:track,
            trackFeatures: trackFeatures[index]
          }
        }))
        
      });
    });

    spotifyApi
      .getMyCurrentPlaybackState({
        market: "ES",
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  const playLikedSongs = (track) => {
    spotifyApi
      .play({
        uris: trackIds.map((id) => `spotify:track:${id}`),
        offset: { uri: `spotify:track:${track.id}` },
      })
      .then((response) => {
        setNowPlaying(track);
        setIsPlaying(true);
      });
  };

  const filterTracks = (tracks) => {
    let filteredTracks = [...tracks].filter((track)=>{
      for (let [key, value] of Object.entries(featureState)) {

        if( track.trackFeatures[key]*100 >= value){
          return false;
        }
      }
      return true;
    })
    return filteredTracks
  }

  const sortTracks = (tracks) =>{
    console.log(sortDirection)
    console.log(activeFeature);
    if(sortDirection !== "down" && sortDirection !== "up"){
      console.log("default")
      return tracks;
    }
    console.log("here")
    let sortedTracks = [...tracks].sort((a,b)=>{
      if(sortDirection==="down"){
        return a.trackFeatures[activeFeature] - b.trackFeatures[activeFeature];
      }else{
        return b.trackFeatures[activeFeature] - a.trackFeatures[activeFeature]
      }
    })
    return sortedTracks
  }

  const RenderTracks = () => {
    let filteredTracks = filterTracks(tracks);
    let sortedTracks = sortTracks(filteredTracks)

    return sortedTracks.map((track, index) => {
      return (
        <li key={track.track.track.id} className="py-2 px-2">
          <Card
            playLikedSongs={playLikedSongs}
            trackData={track}
          />
        </li>
      );
    })

  }

  return (
    <>
      <div className="container mx-auto py-2" style={{paddingBottom:"108px"}}>
        <h1 className="font-bold text-3xl mx-2 text-white">Liked Songs</h1>
        <ul className="">
          {<RenderTracks></RenderTracks>}
        </ul>
      </div>
      <BottomNav tracks={tracks} setFeatureState={setFeatureState} setSortDirection={setSortDirection} setActiveFeature={setActiveFeature} sortDirection={sortDirection} activeFeature={activeFeature}></BottomNav>
    </>
  );
}
