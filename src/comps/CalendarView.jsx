import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#388e3c";
    case "Upcoming":
      return "#fbc02d";
    case "Blocked":
      return "#d32f2f";
    case "Client Reviewing":
      return "#7b1fa2";
    default:
      return "#616161";
  }
};

export default function CalendarView({ tasks = [], milestones = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const taskEvents = tasks
    .filter((task) => task.eta)
    .map((task) => ({
      title: task.title,
      start: new Date(task.eta),
      end: new Date(task.eta),
      allDay: true,
      type: "task",
      status: task.status,
    }));

  const milestoneEvents = milestones
    .filter((ms) => ms.dueDate)
    .map((ms) => ({
      title: `Milestone: ${ms.title}`,
      start: new Date(ms.dueDate),
      end: new Date(ms.dueDate),
      allDay: true,
      type: "milestone",
      status: "Milestone",
    }));

  const events = [...taskEvents, ...milestoneEvents];

  const CustomEvent = ({ event }) => (
    <span
      style={{
        color:
          event.type === "milestone" ? "#0288d1" : getStatusColor(event.status),
        fontWeight: 600,
      }}
    >
      • {event.title}
    </span>
  );

  return (
    <div style={{ height: 700, marginTop: "2rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="month"
        components={{ event: CustomEvent }}
        popup
        onSelectEvent={(event) => setSelectedEvent(event)}
        style={{ backgroundColor: "#fff", borderRadius: 8, padding: 16 }}
      />

      {selectedEvent && (
        <div style={{ marginTop: 16, padding: 12, background: "#f4f4f4" }}>
          <Typography variant="body1">
            <strong>Selected:</strong> {selectedEvent.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedEvent.start.toLocaleDateString()} — {selectedEvent.status}
          </Typography>
        </div>
      )}
    </div>
  );
}
