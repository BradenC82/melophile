import React, { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../services/SpotifyContext";
import StatRow from "./StatRow";

import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";

export default function Card(props) {

  const {
    spotifyApi,
    nowPlaying,
    setNowPlaying,
    isPlaying,
    setIsPlaying,
  } = useContext(SpotifyContext);

  const play = () => {
      props.playLikedSongs(props.trackData.track)
    // spotifyApi.play({uris: [`spotify:track:${props.trackData.track.id}`],})
    //   .then((response) => {
    //     if (response.statusCode === 204) {
    //       setNowPlaying(props.trackData.track);
    //       setIsPlaying(true);
    //     }
    //   });

    // spotifyApi
    //   .play({
    //     context_uri: "spotify:album:2Dw87Ob66XprXiHKbhifJB",
    //     offset: { position: 1 },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.statusCode === 204) {
    //       setNowPlaying(props.trackData.track);
    //       setIsPlaying(true);
    //     }
    //   });
  };

  const pause = () => {
    spotifyApi.pause().then((response) => {
      if (response.statusCode === 204) {
        setIsPlaying(false);
      }
    });
  };

  return (
    <div className="w-full flex flex-col border-2 bg-white rounded-lg p-6">
      <div className="flex pb-2">
          
        <img src={props.trackData.track.album.images[2].url}></img>
        {nowPlaying.id === props.trackData.track.id && isPlaying ? (
          <PauseIcon className="h-12 w-12" onClick={pause} />
        ) : (
          <PlayIcon className="h-12 w-12" onClick={play} />
        )}
        <div className="ml-2 h-16" style={{ overflow: "hidden" }}>
          <h2
            className="block text-lg leading-tight font-semibold text-gray-900"
            style={{ whiteSpace: "nowrap" }}
          >
            {props.trackData.track.name}
          </h2>
          <p className="mt-2 text-gray-600" style={{ whiteSpace: "nowrap" }}>
            {props.trackData.track.artists
              .map((artist) => artist.name)
              .join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <StatRow
          color="bg-red-500"
          stat={props.trackFeatureData.danceability}
        ></StatRow>
        <StatRow
          color="bg-green-500"
          stat={props.trackFeatureData.energy}
        ></StatRow>
        <StatRow
          color="bg-purple-500"
          stat={props.trackFeatureData.speechiness}
        ></StatRow>
        <StatRow
          color="bg-orange-500"
          stat={props.trackFeatureData.acousticness}
        ></StatRow>
        <StatRow
          color="bg-blue-500"
          stat={props.trackFeatureData.instrumentalness}
        ></StatRow>
        <StatRow
          color="bg-yellow-500"
          stat={props.trackFeatureData.liveness}
        ></StatRow>
      </div>
    </div>
  );
}
