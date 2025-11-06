import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Skelton() {
  return (
    <Stack spacing={1} sx={{ height: "100%" }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ bgcolor: "gray", height: "100%" }}
      />
    </Stack>
  );
}

export default Skelton;
