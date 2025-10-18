import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Skelton() {
  return (
    <div>
      <Stack spacing={1}>
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="75%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rounded"
          width="75%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
      </Stack>
    </div>
  );
}

export default Skelton;
