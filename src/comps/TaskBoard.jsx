import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function TaskBoard({ tasks = [] }) {
  const grouped = {
    "In Progress": tasks.filter(
      (t) => t.status === "In Progress" || t.status === "Undergoing Internal QA"
    ),
    "Client Reviewing": tasks.filter((t) => t.status === "Client Reviewing"),
    Upcoming: tasks.filter((t) => t.status === "Upcoming"),
    Blocked: tasks.filter((t) => t.status === "Blocked"),
  };

  return (
    <Box display="flex" gap={4} flexWrap="wrap">
      {Object.entries(grouped).map(([group, items]) => (
        <Box key={group} width={{ xs: "100%", md: "32%" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {group}
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No tasks.
            </Typography>
          ) : (
            items.map((task, i) => {
              const hasDate = !!(task.eta || task.startDate);

              const formattedDate = hasDate
                ? new Date(task.eta || task.startDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }
                  )
                : null;

              const mtnTime =
                task.status === "In Progress" && task.eta
                  ? new Intl.DateTimeFormat("en-US", {
                      timeZone: "America/Denver",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(task.eta))
                  : null;

              return (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{ p: 2, mb: 1, borderLeft: "4px solid #1976d2" }}
                >
                  <Typography variant="body1" fontWeight={500}>
                    {task.title}
                  </Typography>

                  {task.status === "Upcoming" && formattedDate && (
                    <Typography variant="caption" color="text.secondary">
                      Expected Start: {formattedDate}
                    </Typography>
                  )}

                  {task.status === "In Progress" && formattedDate && (
                    <Typography variant="caption" color="text.secondary">
                      ETA: {formattedDate} — {mtnTime} MT
                    </Typography>
                  )}

                  {task.status === "Client Reviewing" && formattedDate && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      Client is currently reviewing this item.
                      <br />
                      Next check-in: {formattedDate}
                    </Typography>
                  )}
                </Paper>
              );
            })
          )}
        </Box>
      ))}
    </Box>
  );
}
