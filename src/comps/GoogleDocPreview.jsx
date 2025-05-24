import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function GoogleDocPreview({ url }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        View Scope
      </Typography>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        Wild Montana:: 4 Week Sprint
      </Link>
    </Box>
  );
}
