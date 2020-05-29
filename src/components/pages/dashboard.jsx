import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../../services/SpotifyContext";
import Alert from "../Alert";
import BottomNav from "../BottomNav";
import Card from "../Card";
import Info from "../Info";
import { Link } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";


export default function Dashboard() {
  const { spotifyApi, setNowPlaying, isPlaying, setIsPlaying } = useContext(
    SpotifyContext
  );

  const [tracks, setTracks] = useState([]);
  const [trackIds, setTrackIds] = useState([]);

  const [featureState, setFeatureState] = useState({});
  const [sortDirection, setSortDirection] = useState("none");
  const [activeFeature, setActiveFeature] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let parsed = queryString.parse(window.location.search.slice(1));
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    console.log(spotifyApi);
    spotifyApi.getMySavedTracks({ limit: 50 }).then((response) => {
      let tracks = response.body.items;

      let trackIDS = response.body.items.map((trackData) => trackData.track.id);
      setTrackIds(trackIDS);
      spotifyApi.getAudioFeaturesForTracks(trackIDS).then((response) => {
        let trackFeatures = response.body.audio_features;

        setTracks(
          tracks.map((track, index) => {
            return {
              track: track,
              trackFeatures: trackFeatures[index],
            };
          })
        );
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

  const loadMore = () => {
    console.log("here");
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: tracks.length,
      })
      .then((response) => {
        let tracks = response.body.items;
        let trackIDS = response.body.items.map(
          (trackData) => trackData.track.id
        );
        setTrackIds((prevIds) => prevIds.concat(trackIDS));

        spotifyApi.getAudioFeaturesForTracks(trackIDS).then((response) => {
          let trackFeatures = response.body.audio_features;

          setTracks((prevTracks) => {
            let newTracks = tracks.map((track, index) => {
              return {
                track: track,
                trackFeatures: trackFeatures[index],
              };
            });
            return prevTracks.concat(newTracks);
          });
        });
      });
  };

  const playLikedSongs = (track) => {
    setIsPlaying(true);
    setNowPlaying(track);
    spotifyApi
      .play({
        uris: [`spotify:track:${track.id}`],
      })
      .then((response) => {
        
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          setOpen(true);
        }
      });
  };

  const filterTracks = (tracks) => {
    let filteredTracks = [...tracks].filter((track) => {
      for (let [key, value] of Object.entries(featureState)) {
        if (track.trackFeatures[key] * 100 >= value) {
          return false;
        }
      }
      return true;
    });
    return filteredTracks;
  };

  const sortTracks = (tracks) => {
    console.log(sortDirection);
    console.log(activeFeature);
    if (sortDirection !== "down" && sortDirection !== "up") {
      console.log("default");
      return tracks;
    }
    console.log("here");
    let sortedTracks = [...tracks].sort((a, b) => {
      if (sortDirection === "down") {
        return a.trackFeatures[activeFeature] - b.trackFeatures[activeFeature];
      } else {
        return b.trackFeatures[activeFeature] - a.trackFeatures[activeFeature];
      }
    });
    return sortedTracks;
  };

  const RenderTracks = () => {
    let filteredTracks = filterTracks(tracks);
    let sortedTracks = sortTracks(filteredTracks);

    return sortedTracks.map((track, index) => {
      return (
        <li key={track.track.track.id} className="py-2 ">
          <Card playLikedSongs={playLikedSongs} trackData={track} />
        </li>
      );
    });
  };

  return (
    <>
      <div
        className="container mx-auto px-2 py-2"
        style={{ paddingBottom: "108px" }}
      >
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-bold text-3xl  text-white">Liked Songs</h1>
            <p className="mt-1 text-gray-500" style={{ whiteSpace: "nowrap" }}>
              {`Displaying ${tracks.length} tracks`}
            </p>
            
          </div>

          <div style={{display:'inline'}}>

            <Link to='/'>
              <LogoutIcon style={{display:'inline'}}className="h-8 w-8 mr-2">
                Logout 
              </LogoutIcon>
            </Link>
            
            <Info style={{display:'inline'}} ></Info>
          </div>
          
        </div>

        <Alert open={open} setOpen={setOpen}></Alert>

        <ul className="">{<RenderTracks></RenderTracks>}</ul>
        {tracks.length ? (
          <button
            className=" shadow-md rounded-lg p-2 px-4 mb-2   text-md  font-semibold text-white"
            style={{ backgroundColor: "#2d3748" }}
            onClick={() => loadMore()}
          >
            LOAD MORE
          </button>
        ) : null}
      </div>
      <BottomNav
        tracks={tracks}
        setFeatureState={setFeatureState}
        setSortDirection={setSortDirection}
        setActiveFeature={setActiveFeature}
        sortDirection={sortDirection}
        activeFeature={activeFeature}
      ></BottomNav>
    </>
  );
}
