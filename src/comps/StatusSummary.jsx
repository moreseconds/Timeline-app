import React from "react";
import { Paper, Typography } from "@mui/material";

export default function StatusSummary({ text }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
}
