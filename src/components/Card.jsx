import React, { useContext } from "react";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { SpotifyContext } from "../services/SpotifyContext";
import StatRow from "./StatRow";


export default function Card(props) {
  const {
    spotifyApi,
    nowPlaying,
    setNowPlaying,
    isPlaying,
    setIsPlaying,
  } = useContext(SpotifyContext);

  const play = () => {
    props.playLikedSongs(props.trackData.track.track);
  };

  const pause = () => {
    setIsPlaying(false);
    spotifyApi.pause().then((response) => {
      if (response.statusCode === 204) {
        
      }
    });
  };

  return (
    <div
      className=" shadow-md w-full flex flex-col rounded-lg p-4 "
      style={{ backgroundColor: "#2d3748" }}
    >
      <div className=" pb-2 w-full">
        <div style={{ float: "left" }}>
          <img
            src={props.trackData.track.track.album.images[2].url}
            style={{ width: "64px" }}
            alt="Album Cover"
          ></img>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className={"pl-2"} style={{ float: "right" }}>
            {nowPlaying.id === props.trackData.track.track.id && isPlaying ? (
              <PauseIcon
                className=""
                style={{
                  float: "right",
                  fill: "#fff",
                  width: "48px",
                  height: "48px",
                }}
                onClick={pause}
              />
            ) : (
              <PlayIcon
                className=""
                style={{
                  float: "right",
                  fill: "#fff",
                  width: "48px",
                  height: "48px",
                }}
                onClick={play}
              />
            )}
          </div>

          <div className="ml-2 h-16" style={{ overflow: "hidden" }}>
            <h2
              className="block text-lg leading-tight font-semibold text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              {props.trackData.track.track.name}
            </h2>
            <p className="mt-1 text-gray-500" style={{ whiteSpace: "nowrap" }}>
              {props.trackData.track.track.artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <StatRow
          color="#ff6b6b"
          stat={props.trackData.trackFeatures.danceability}
          label={"danceability"}
        ></StatRow>
        <StatRow
          color="#ffe66d"
          stat={props.trackData.trackFeatures.energy}
          label={"energy"}
        ></StatRow>
        <StatRow
          color="#78E3FD"
          stat={props.trackData.trackFeatures.valence}
          label={"positivity"}
        ></StatRow>
        <StatRow
          color="#1A535C"
          stat={props.trackData.trackFeatures.acousticness}
          label={"acousticness"}
        ></StatRow>
        {/* <StatRow
          color="#4ECDC4"
          stat={props.trackData.trackFeatures.instrumentalness}
          label={"instrumentalness"}
        ></StatRow> */}
        <StatRow
          color="#F7FFF7"
          stat={props.trackData.trackFeatures.speechiness}
          label={"speechiness"}
        ></StatRow>
      </div>
    </div>
  );
}
