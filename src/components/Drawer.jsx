import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { ReactComponent as HamburgerIcon } from "../assets/icons/hamburger.svg";
import { ReactComponent as SortDownIcon } from "../assets/icons/sortDown.svg";
import { ReactComponent as SortUpIcon } from "../assets/icons/sortUp.svg";
import "./Drawer.css";

const BarSlider = withStyles({
  root: {
    height: 10,
  },
  thumb: {
    height: 24,
    width: 12,
    backgroundColor: 'currentColor',
    border: '2px solid #fff',
    marginTop: -5,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    borderRadius:4
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 8px)",
    color:"#242932"
  },
  track: {
    height: 10,
  },
  rail: {
    height: 10,
  },
})(Slider);

export default function Drawer(props) {
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerToggleHandler = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  let DrawerClasses =
    "root center transition duration-500 ease-out w-full bg-gray-800 fixed   z-0 w-auto  ";

  if (drawerOpen) {
    DrawerClasses += "normal";
  }

  const [dance, setDance] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [speech, setSpeech] = useState(100);
  const [acoustic, setAcoustic] = useState(100);
  const [instrumental, setInstrumental] = useState(100);
  const [valence, setValence] = useState(100);

  const SortArrow = (props) => {
    if (props.activeFeature === props.feature) {
      if (props.sortDirection === "up") {
        return (
          <SortUpIcon
            className="h-10 w-10"
            style={{ fill: "#fd6969" }}
            onClick={() => {
              props.setSortDirection("down");
              props.setActiveFeature(props.feature);
            }}
          ></SortUpIcon>
        );
      } else if (props.sortDirection === "down") {
        return (
          <SortDownIcon
            className="h-10 w-10"
            style={{ fill: "#fd6969" }}
            onClick={() => {
              props.setSortDirection("up");
              props.setActiveFeature(props.feature);
            }}
          ></SortDownIcon>
        );
      }
    } else {
      return (
        <SortUpIcon
          className="h-10 w-10"
          onClick={() => {
            props.setSortDirection("up");
            props.setActiveFeature(props.feature);
          }}
        ></SortUpIcon>
      );
    }
  };

  const commitFilterState = () => {
    props.setFeatureState({
      danceability: dance,
      energy: energy,
      speechiness: speech,
      acousticness: acoustic,
      instrumentalness: instrumental,
      valence: valence,
    });
  };


  

  return (
    <div className={DrawerClasses}>
      <div className="container mx-auto py-2 pl-2 pr-6 flex-col justify-apart">
        <div className="flex ">
          <h2
            className="font-bold text-3xl text-white"
            style={{ whiteSpace: "nowrap", lineHeight: "28px" }}
          >
            Filter
          </h2>
          <HamburgerIcon
            onClick={drawerToggleHandler}
            className="text-right ml-auto mr-2 mb-2 cursor-pointer"
          ></HamburgerIcon>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={dance}
              className="slider w-full"
              style={{color:'#fe6a6a'}}
              onChange={(e, newValue) => {
                console.log('yo')
                setDance(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                console.log('commit')
                setDance(newValue);
                commitFilterState();
              }}
              ></BarSlider>
  
            <SortArrow feature="danceability" {...props}></SortArrow>
          </div>

          <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={energy}
              className="slider w-full"
              style={{color:'#ffe56c'}}
              onChange={(e, newValue) => {
                setEnergy(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                setEnergy(newValue);
                commitFilterState();
              }}
              
              
            />
            <SortArrow feature="energy" {...props}></SortArrow>
          </div>

          <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={valence}
              className="slider w-full"
              style={{color:"#77e2fc"}}
              onChange={(e, newValue) => {
                setValence(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                setValence(newValue);
                commitFilterState();
              }}
            />
            <SortArrow feature="valence" {...props}></SortArrow>
          </div>

          <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={acoustic}
              className="slider w-full"
              style={{color:"#1f535c"}}
              onChange={(e, newValue) => {
                setAcoustic(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                setAcoustic(newValue);
                commitFilterState();
              }}
            />
            <SortArrow feature="acousticness" {...props}></SortArrow>
          </div>

          {/* <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={instrumental}
              className="slider w-full"
              style={{color: "#4299e1"}}
              onChange={(e, newValue) => {
                setInstrumental(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                setInstrumental(newValue);
                commitFilterState();
              }}
            />
            <SortArrow feature="instrumentalness" {...props}></SortArrow>
          </div> */}

          <div className="flex">
            <BarSlider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              value={speech}
              className="slider w-full"
              style={{color:"#f6fff6"}}
              onChange={(e, newValue) => {
                setSpeech(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                setSpeech(newValue);
                commitFilterState();
              }}
            />
            <SortArrow feature="speechiness" {...props}></SortArrow>
          </div>
        </div>
      </div>
    </div>
  );
}
