import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Skelton() {
  return (
    <div className="w-full h-full">
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="90%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="75%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="50%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="75%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="50%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="75%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.800" }}
        />
        <Skeleton
          variant="rectangular"
          width="50%"
          height={50}
          sx={{ bgcolor: "grey.800" }}
        />
      </Stack>
    </div>
  );
}

export default Skelton;
