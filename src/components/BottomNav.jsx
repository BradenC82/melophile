import React, { useState, useContext } from "react";
import { SpotifyContext } from "../services/SpotifyContext";
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";

import Drawer from "./Drawer";
import { ReactComponent as HamburgerIcon } from "../assets/icons/hamburger.svg";

export default function BottomNav(props) {
  const { spotifyApi, isPlaying, setIsPlaying, nowPlaying } = useContext(
    SpotifyContext
  );

  const resume = () => {
    spotifyApi.play().then(setIsPlaying(true));
    console.log(nowPlaying);
  };

  const pause = () => {
    spotifyApi.pause().then(setIsPlaying(false));
  };

  return (
    <>
      <div className="fixed bottom-0 w-full h-16 bg-gray-900 z-10 ">
        <div className="flex items-center justify-between container mx-auto p-2 h-full bg-gray-900">
          <div className="flex items-center">
            <img src={nowPlaying && nowPlaying.album.images[2].url}></img>

            {nowPlaying && (
              <div className={"ml-2"}>
                <h2
                  className="block text-lg leading-tight font-semibold text-white"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {nowPlaying.name}
                </h2>
                <p
                  className="mt-2 text-gray-600"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {nowPlaying.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            )}
          </div>

          {isPlaying ? (
            <PauseIcon
              className="h-12 w-12 mr-4"
              style={{ fill: "#fff" }}
              onClick={pause}
            />
          ) : (
            <PlayIcon
              className="h-12 w-12 mr-4"
              style={{ fill: "#fff" }}
              onClick={resume}
            />
          )}
        </div>
      </div>
      <Drawer {...props}></Drawer>
    </>
  );
}
