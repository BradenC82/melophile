import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

export default function AlertDialog(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "rgb(45, 55, 72)",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <h2
            className="block text-xl leading-tight font-semibold text-white"
            style={{ whiteSpace: "nowrap" }}
          >
            No active device found
          </h2>
        </DialogTitle>
        <DialogContent>
          <p className="text-md text-white">
            {" "}
            Open Spotify and press play on any track to enable playback on your
            preferred device.
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className=" shadow-md rounded-md p-2 px-4   text-md  font-semibold text-white"
            style={{
              color: "#fff",
              backgroundColor: "rgb(31, 37, 47)",
              margin: "0 8px 8px 0",
            }}
          >
            Okay
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
