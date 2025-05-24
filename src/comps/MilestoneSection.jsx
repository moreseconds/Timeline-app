import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function MilestoneSection({ milestones, tasks }) {
  if (!milestones || milestones.length === 0) {
    return <Typography>No milestones available.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Milestones
      </Typography>

      {milestones.map((ms, index) => (
        <Box key={index} mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            {ms.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Due:{" "}
            {ms.dueDate
              ? new Date(ms.dueDate).toLocaleDateString()
              : "No due date"}
          </Typography>

          {ms.taskIds.length === 0 ? (
            <Typography color="textSecondary" mt={1}>
              No tasks assigned.
            </Typography>
          ) : (
            <List dense>
              {ms.taskIds.map((taskId) => {
                const task = tasks?.[taskId];
                return (
                  <ListItem key={taskId}>
                    <ListItemText
                      primary={task?.title || "[Task not found]"}
                      secondary={`Status: ${task?.status || "Unknown"}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
}
