import { Box, Typography } from "@mui/material";

export default function ClientHeader({ clientName }) {
  return (
    <Box mb={2}>
      <Typography variant="h4" fontWeight="bold">
        {clientName}
      </Typography>
      <Typography color="text.secondary">
        Last updated: Tue, May 21, 2025 at 3:42pm MTN
      </Typography>
    </Box>
  );
}
