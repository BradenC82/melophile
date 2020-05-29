import React, { useContext } from "react";
import { ReactComponent as AlbumIcon } from "../assets/icons/album.svg";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { SpotifyContext } from "../services/SpotifyContext";
import Drawer from "./Drawer";

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
            {nowPlaying ? (
              <img
                src={nowPlaying && nowPlaying.album.images[2].url}
                style={{ width: "54px", height: "54px" }}
                alt="Album Cover"
              ></img>
            ) : (
              <>
                <div className="bg-gray-900">
                  <AlbumIcon
                    style={{
                      width: "54px",
                      height: "54px",
                      fill: "#303949",
                      border: "3px solid #303949",
                      borderRadius: "3px",
                    }}
                  ></AlbumIcon>
                </div>

                <div className={"ml-2"}>
                  <div
                    className="block bg-gray-500  h-4 w-32 font-semibold text-white"
                    style={{
                      whiteSpace: "nowrap",
                      height: "20px",
                      backgroundColor: "#303949",
                    }}
                  ></div>
                  <div
                    className="mt-2 text-gray-600 bg-gray-500 h-4 w-20"
                    style={{
                      whiteSpace: "nowrap",
                      height: "20px",
                      backgroundColor: "#303949",
                    }}
                  ></div>
                </div>
              </>
            )}

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
