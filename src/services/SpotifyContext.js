import React, { useState } from "react";
var SpotifyWebApi = require("spotify-web-api-node");
export const SpotifyContext = React.createContext();

var spotifyApi = new SpotifyWebApi();

export function SpotifyProvider(props) {
  const [nowPlaying, setNowPlaying] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <SpotifyContext.Provider
      value={{ spotifyApi, nowPlaying, setNowPlaying, isPlaying, setIsPlaying }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
}
