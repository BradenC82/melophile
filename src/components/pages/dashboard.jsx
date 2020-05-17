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
  const [name, setName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [trackIds, setTrackIds] = useState([]);
  const [trackFeatures, setTrackFeatures] = useState([]);

  useEffect(() => {
    let parsed = queryString.parse(window.location.search.slice(1));
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    console.log(spotifyApi);
    spotifyApi.getMySavedTracks().then((response) => {
      setTracks(response.body.items);

      let trackIDS = response.body.items.map((trackData) => trackData.track.id);
      setTrackIds(trackIDS);
      spotifyApi.getAudioFeaturesForTracks(trackIDS).then((response) => {
        setTrackFeatures(response.body.audio_features);
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

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="font-bold text-3xl">Liked Songs</h1>
        <ul className="">
          {tracks.map((track, index) => {
            return (
              <li key={track.track.id} className="my-4">
                <Card
                  playLikedSongs={playLikedSongs}
                  trackData={track}
                  trackFeatureData={
                    trackFeatures.length ? trackFeatures[index] : 0
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
      <BottomNav tracks={tracks}></BottomNav>
    </>
  );
}
