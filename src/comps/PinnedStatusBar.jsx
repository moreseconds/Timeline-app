import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Grid,
  LinearProgress,
} from "@mui/material";

export default function PinnedStatusBar({
  phase = 2,
  totalPhases = 4,
  launchDate = "June 5, 2025",
}) {
  const progressPercent = (phase / totalPhases) * 100;

  return (
    <Box
      sx={{
        backgroundColor: "#fef3c7",
        border: "1px solid #fcd34d",
        borderRadius: 2,
        padding: 2,
        mb: 3,
      }}
    >
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        🚀 Launching {launchDate} — Currently in Phase {phase} of {totalPhases}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{ height: 8, borderRadius: 4, backgroundColor: "#fef9c3" }}
      />
    </Box>
  );
}
