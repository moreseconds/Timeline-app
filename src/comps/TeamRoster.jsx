import React from "react";

import {
  Box,
  Typography,
  Chip,
  Avatar,
  Grid,
  LinearProgress,
} from "@mui/material";

export default function TeamRoster({ team }) {
  return (
    <Box
      sx={{
        backgroundColor: "#f3f4f6",
        borderRadius: 2,
        p: 2,
        mt: 4,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Project Team
      </Typography>
      <Grid container spacing={1}>
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar>{member.name[0]}</Avatar>
              <Box>
                <Typography variant="body1">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role} — {member.email} ({member.timezone})
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="caption"
        color="text.secondary"
        mt={2}
        display="block"
      >
        Typical response time: within 1 business day
      </Typography>
    </Box>
  );
}
