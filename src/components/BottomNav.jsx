import React, { useContext } from "react";
import { SpotifyContext } from "../services/SpotifyContext";
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";

export default function BottomNav(props) {
  const {
    spotifyApi,
    isPlaying,
    setIsPlaying,
    nowPlaying
  } = useContext(SpotifyContext);

  const resume = () => {
    spotifyApi.play().then(setIsPlaying(true));
    console.log(nowPlaying)
  };

  const pause = () => {
    spotifyApi.pause().then(setIsPlaying(false));
  };

  return (
    <div className="fixed bottom-0 w-full h-16 bg-gray-900">
      <div className="flex items-center container mx-auto p-4  h-full bg-gray-700">

      <img src={nowPlaying&&nowPlaying.album.images[2].url}></img>

        
      {isPlaying ? (
          <PauseIcon className="h-12 w-12" onClick={pause} />
        ) : (
          <PlayIcon className="h-12 w-12" onClick={resume} />
        )}
        

        {nowPlaying && (
         <div>
            <h2
            className="block text-lg leading-tight font-semibold text-gray-900"
            style={{ whiteSpace: "nowrap" }}
            >
            {nowPlaying.name}
          </h2>
          <p className="mt-2 text-gray-600" style={{ whiteSpace: "nowrap" }}>
            {nowPlaying.artists
              .map((artist) => artist.name)
              .join(", ")}
          </p>
          </div>
        )}



      </div>
    </div>
  );
}
