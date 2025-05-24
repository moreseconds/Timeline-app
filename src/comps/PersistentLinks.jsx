import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Divider,
} from "@mui/material";

export default function PersistentLinks({ links }) {
  if (!links || links.length === 0) {
    return <Typography>No important links added yet.</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Important Links
      </Typography>
      <List dense>
        {links.map((link, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText
              primary={
                <MuiLink href={link.url} target="_blank" rel="noopener">
                  {link.label}
                </MuiLink>
              }
              secondary={
                link.dateAdded
                  ? `Added on ${new Date(link.dateAdded).toLocaleDateString()}`
                  : null
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
