import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingCircul() {
  return (
    <CircularProgress
      disableShrink
      size={45}
      sx={{
        color: "red",
      }}
    />
  );
}

export default LoadingCircul;
