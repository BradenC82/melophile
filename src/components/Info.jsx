import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import React from "react";
import { ReactComponent as InfoIcon } from "../assets/icons/info.svg";

export default function PositionedPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div style={{display:'inline'}}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{ maxWidth: "300px" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="p-4" style={{backgroundColor: "rgb(54, 65, 83)"}}>
              <h2 className="text-lg leading-tight font-semibold text-white">
                Welcome to melophile!
              </h2>
              <p className="text-white" >
                note: sorting and filtering only applies to tracks loaded in the
                site, scroll down and click "load more" to add more tracks to
                the ranking!
              </p>
            </Paper>
          </Fade>
        )}
      </Popper>

      <InfoIcon style={{display:'inline'}} className="h-8 w-8" onClick={handleClick("left-start")}>
      </InfoIcon>
    </div>
  );
}
