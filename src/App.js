import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuList,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ClientUpdatePage from "./pages/ClientUpdatePage";

const theme = createTheme();

const statuses = [
  "Upcoming",
  "In Progress",
  "Undergoing Internal QA",
  "Client Reviewing",
  "Blocked",
  "Completed",
];

export default function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Blog Migration Script",
      status: "In Progress",
      eta: new Date(), // ETA (with MTN timestamp formatting in UI)
    },
    {
      title: "Header Image QA",
      status: "Undergoing Internal QA",
      eta: new Date(), // ETA
    },
    {
      title: "Header Image QA",
      status: "Client Reviewing",
      eta: new Date(), // ETA
    },
    {
      title: "Dev Notes",
      status: "Blocked",
      eta: null, // or just omit eta entirely
    },
    {
      title: "Prelaunch Planning",
      status: "Upcoming",
      startDate: new Date(), // use startDate instead of eta
    },
  ]);

  const testMilestones = [
    {
      title: "Phase One Completion",
      dueDate: new Date(),
      taskIds: [0, 1],
    },
    {
      title: "Final Review",
      dueDate: null,
      taskIds: [],
    },
  ];

  const mockProgressItems = [
    {
      type: "image",
      url: "https://picsum.photos/200",
      caption: "Updated homepage layout",
      timestamp: new Date(),
    },
    {
      type: "video",
      url: "https://www.loom.com/share/e7f7cca9bf874362b29f6021dc6ac217",
      caption: "Loom walkthrough of the admin panel",
      timestamp: new Date(),
    },
    {
      type: "link",
      url: "https://figma.com/file/some-mockup",
      caption: "Latest Figma design preview",
      timestamp: new Date(),
    },
  ];

  const [viewMode, setViewMode] = useState("internal");

  const [newTask, setNewTask] = useState({
    title: "",
    status: "",
    eta: null,
    startDate: null,
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    index: null,
  });

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ label: "", url: "" });

  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    dueDate: null,
    taskIds: [],
  });

  const [statusUpdates, setStatusUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      setStatusUpdates([
        {
          content: newUpdate,
          dateAdded: new Date(),
        },
        ...statusUpdates,
      ]);
      setNewUpdate("");
    }
  };

  const options = {
    timeZone: "America/Denver",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const handleChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    const { title, status, eta, startDate } = newTask;
    if (title && status) {
      const task =
        status === "Upcoming"
          ? { title, status, startDate }
          : { title, status, eta };

      setTasks([...tasks, task]);
      setNewTask({ title: "", status: "", eta: null, startDate: null });
    }
  };

  const [pinnedStatus, setPinnedStatus] = useState({
    show: false,
    phase: 1,
    totalPhases: 4,
    launchDate: "",
  });

  const [teamRoster, setTeamRoster] = useState([
    {
      name: "Danielle T.",
      role: "PM",
      email: "dtate@moreseconds.com",
      timezone: "MTN",
    },
    {
      name: "jSapp",
      role: "Developer",
      email: "jsappington@moreseconds.com",
      timezone: "CT",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    timezone: "",
  });

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleStatusUpdate = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    if (newStatus === "Client Reviewing") updatedTasks[index].eta = null;
    setTasks(updatedTasks);
  };

  const handleEtaUpdate = (index, newValue, status) => {
    const updatedTasks = [...tasks];
    if (status === "Upcoming") {
      updatedTasks[index].startDate = newValue;
    } else {
      updatedTasks[index].eta = newValue;
    }
    setTasks(updatedTasks);
  };

  const handleAddLink = () => {
    if (newLink.label && newLink.url) {
      setLinks([...links, { ...newLink, dateAdded: new Date() }]);
      setNewLink({ label: "", url: "" });
    }
  };

  const handleDeleteLink = (index) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
  };

  const handleAddMilestone = () => {
    if (newMilestone.title) {
      setMilestones([...milestones, { ...newMilestone }]);
      setNewMilestone({ title: "", dueDate: null, taskIds: [] });
    }
  };

  const handleRemoveTaskFromMilestone = (milestoneIndex, taskId) => {
    const updated = [...milestones];
    updated[milestoneIndex].taskIds = updated[milestoneIndex].taskIds.filter(
      (id) => id !== taskId
    );
    setMilestones(updated);
  };

  const handleDeleteMilestone = (index) => {
    const updated = [...milestones];
    updated.splice(index, 1);
    setMilestones(updated);
  };

  const renderSection = (label, filterFn) => (
    <>
      <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
        {label}
      </Typography>

      <div
        style={{
          display: "flex",
          fontWeight: "bold",
          borderBottom: "2px solid #999",
          padding: "10px 0",
          marginBottom: "8px",
        }}
      >
        <div style={{ flex: 1 }}>Task Name</div>
        <div style={{ width: 180 }}>Status</div>
        <div style={{ width: 220 }}>Estimated Completion</div>
        <div style={{ width: 40 }}></div>
      </div>

      {tasks.filter(filterFn).map((task, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            marginBottom: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            gap: "8px",
          }}
        >
          <div style={{ flex: 1 }}>
            {editingIndex === tasks.indexOf(task) ? (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={task.title}
                onChange={(e) => {
                  const updatedTasks = [...tasks];
                  updatedTasks[tasks.indexOf(task)].title = e.target.value;
                  setTasks(updatedTasks);
                }}
                onBlur={() => setEditingIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditingIndex(null);
                  }
                }}
                autoFocus
              />
            ) : (
              <strong
                style={{ cursor: "pointer" }}
                onClick={() => setEditingIndex(tasks.indexOf(task))}
              >
                {task.title}
              </strong>
            )}
          </div>

          <div style={{ width: 180 }}>
            <TextField
              select
              size="small"
              fullWidth
              value={task.status}
              onChange={(e) =>
                handleStatusUpdate(tasks.indexOf(task), e.target.value)
              }
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div style={{ width: 220 }}>
            {task.status === "Blocked" ? (
              <TextField
                size="small"
                fullWidth
                disabled
                value="No Date Needed"
                label="ETA"
              />
            ) : (
              <div style={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label={
                      task.status === "Upcoming"
                        ? "Expected Start"
                        : task.status === "In Progress"
                        ? "ETA (MTN)"
                        : task.status === "Client Reviewing"
                        ? "Next Check-In"
                        : "ETA"
                    }
                    value={
                      task.status === "Upcoming"
                        ? task.startDate || null
                        : task.eta || null
                    }
                    onChange={(newValue) =>
                      handleEtaUpdate(
                        tasks.indexOf(task),
                        newValue,
                        task.status
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>

          <div style={{ width: 40 }}>
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setDeleteDialog({ open: true, index: tasks.indexOf(task) })
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "1rem" }}>
        <Button
          variant="outlined"
          onClick={() =>
            setViewMode(viewMode === "client" ? "internal" : "client")
          }
          style={{
            marginBottom: "1rem",
            background: "#fff",
            border: "2px solid black",
            position: "relative",
            zIndex: 9999,
          }}
        >
          {viewMode === "client" ? "Back to Internal View" : "View Client Page"}
        </Button>
        {viewMode === "client" ? (
          <ClientUpdatePage
            statusUpdates={statusUpdates}
            tasks={tasks}
            milestones={testMilestones}
            links={links}
            progressItems={mockProgressItems}
            pinnedStatus={pinnedStatus.show ? pinnedStatus : null}
            teamRoster={teamRoster}
          />
        ) : (
          <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            {renderSection(
              "In Progress",
              (task) => task.status !== "Upcoming" && task.status !== "Blocked"
            )}
            {renderSection("Upcoming", (task) => task.status === "Upcoming")}
            {renderSection("Backlog", (task) => task.status === "Blocked")}

            {/* Delete Confirmation Dialog */}
            <Dialog
              open={deleteDialog.open}
              onClose={() => setDeleteDialog({ open: false, index: null })}
            >
              <DialogTitle>Delete Task?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDeleteDialog({ open: false, index: null })}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(deleteDialog.index);
                    setDeleteDialog({ open: false, index: null });
                  }}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* Add Task Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "32px",
                marginBottom: "16px",
                gap: "8px",
              }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              <div style={{ width: 150 }}>
                <TextField
                  select
                  size="small"
                  placeholder="Status"
                  fullWidth
                  value={newTask.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div style={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label={
                      newTask.status === "Client Reviewing"
                        ? "Next Check-In"
                        : "ETA"
                    }
                    value={newTask.eta}
                    onChange={(newValue) => handleChange("eta", newValue)}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <Button variant="contained" color="primary" onClick={addTask}>
              Add Task
            </Button>

            {/* Links Section */}
            <Typography variant="h5" gutterBottom style={{ marginTop: "3rem" }}>
              Links
            </Typography>
            <div
              style={{
                display: "flex",
                fontWeight: "bold",
                borderBottom: "2px solid #999",
                padding: "10px 0",
                marginBottom: "8px",
              }}
            >
              <div style={{ flex: 2 }}>Label</div>
              <div style={{ flex: 3 }}>URL</div>
              <div style={{ width: 160 }}>Date Added</div>
              <div style={{ width: 40 }}></div>
            </div>
            {links.map((link, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  gap: "8px",
                }}
              >
                <div style={{ flex: 2 }}>{link.label}</div>
                <div style={{ flex: 3 }}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </div>
                <div style={{ width: 160 }}>
                  {new Date(link.dateAdded).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div style={{ width: 40 }}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteLink(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}

            {/* Add New Link */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
                gap: "8px",
              }}
            >
              <div style={{ flex: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Link Label"
                  value={newLink.label}
                  onChange={(e) =>
                    setNewLink({ ...newLink, label: e.target.value })
                  }
                />
              </div>
              <div style={{ flex: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Link URL"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
              </div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddLink}
              >
                Add Link
              </Button>
            </div>

            <Typography variant="h5" gutterBottom style={{ marginTop: "3rem" }}>
              Milestones
            </Typography>
            <div
              style={{
                display: "flex",
                fontWeight: "bold",
                borderBottom: "2px solid #999",
                padding: "10px 0",
                marginBottom: "8px",
              }}
            >
              <div style={{ flex: 2 }}>Milestone</div>
              <div style={{ width: 200 }}>Due Date</div>
              <div style={{ width: 100 }}># Tasks</div>
              <div style={{ width: 40 }}></div>
            </div>
            {milestones.map((ms, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 2, fontWeight: "bold" }}>{ms.title}</div>
                  <div style={{ width: 200 }}>
                    {ms.dueDate
                      ? new Date(ms.dueDate).toLocaleDateString()
                      : "—"}
                  </div>
                  <div style={{ width: 100 }}>{ms.taskIds.length}</div>
                  <div style={{ width: 40 }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteMilestone(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
                {ms.taskIds.length > 0 && (
                  <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                    {ms.taskIds.map((id) => (
                      <li key={id}>
                        {tasks[id]?.title || "[Task not found]"}
                        <span
                          style={{
                            marginLeft: "1rem",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color:
                              !ms.dueDate || !tasks[id]?.eta
                                ? "#666"
                                : new Date(tasks[id].eta) <=
                                  new Date(ms.dueDate)
                                ? "green"
                                : "red",
                          }}
                        >
                          {!ms.dueDate || !tasks[id]?.eta
                            ? "Unscheduled"
                            : new Date(tasks[id].eta) <= new Date(ms.dueDate)
                            ? "On Track"
                            : "Delayed"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Add New Milestone */}
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                size="small"
                label="Milestone Title"
                value={newMilestone.title}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, title: e.target.value })
                }
                style={{ width: "200px", marginRight: "1rem" }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date (optional)"
                  value={newMilestone.dueDate}
                  onChange={(newValue) =>
                    setNewMilestone({ ...newMilestone, dueDate: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      style={{ width: "220px", marginRight: "1rem" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                select
                SelectProps={{ multiple: true }}
                size="small"
                label="Assign Tasks"
                value={newMilestone.taskIds}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, taskIds: e.target.value })
                }
                style={{ width: "300px", marginRight: "1rem" }}
              >
                {tasks.map((task, index) => (
                  <MenuItem key={index} value={index}>
                    {task.title}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="outlined" onClick={handleAddMilestone}>
                Add Milestone
              </Button>
            </div>
            {/* END New Milestone */}
            <Typography variant="h5" gutterBottom style={{ marginTop: "3rem" }}>
              Status Updates
            </Typography>

            {/* Show all existing updates */}
            {statusUpdates.map((update, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "16px",
                  marginBottom: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="textSecondary"
                >
                  Last Update:{" "}
                  {new Date(update.dateAdded).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography paragraph>{update.content}</Typography>
              </div>
            ))}

            {/* ✅ Move this below the map */}
            <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
              <Typography variant="h6" gutterBottom>
                Add New Status Update
              </Typography>
              <TextField
                fullWidth
                multiline
                label="Write your update here..."
                rows={5}
                size="small"
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                style={{ marginBottom: "12px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUpdate}
              >
                Add Update
              </Button>
            </div>

            {/* END Status Update Form */}

            {/* START Status Update Form */}

            <Box mt={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pinnedStatus.show}
                    onChange={(e) =>
                      setPinnedStatus({
                        ...pinnedStatus,
                        show: e.target.checked,
                      })
                    }
                  />
                }
                label="Show Pinned Status Bar"
              />
              {pinnedStatus.show && (
                <Box mt={2} display="flex" gap={2} alignItems="center">
                  <TextField
                    label="Current Phase"
                    type="number"
                    size="small"
                    value={pinnedStatus.phase}
                    onChange={(e) =>
                      setPinnedStatus({
                        ...pinnedStatus,
                        phase: +e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Total Phases"
                    type="number"
                    size="small"
                    value={pinnedStatus.totalPhases}
                    onChange={(e) =>
                      setPinnedStatus({
                        ...pinnedStatus,
                        totalPhases: +e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Launch Date"
                    size="small"
                    value={pinnedStatus.launchDate}
                    onChange={(e) =>
                      setPinnedStatus({
                        ...pinnedStatus,
                        launchDate: e.target.value,
                      })
                    }
                    placeholder="e.g. June 5, 2025"
                  />
                </Box>
              )}
            </Box>

            <Typography variant="h5" gutterBottom style={{ marginTop: "3rem" }}>
              Team Roster
            </Typography>

            {teamRoster.map((member, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <TextField
                  label="Name"
                  value={member.name}
                  size="small"
                  onChange={(e) => {
                    const updated = [...teamRoster];
                    updated[index].name = e.target.value;
                    setTeamRoster(updated);
                  }}
                />
                <TextField
                  label="Role"
                  value={member.role}
                  size="small"
                  onChange={(e) => {
                    const updated = [...teamRoster];
                    updated[index].role = e.target.value;
                    setTeamRoster(updated);
                  }}
                />
                <TextField
                  label="Email"
                  value={member.email}
                  size="small"
                  onChange={(e) => {
                    const updated = [...teamRoster];
                    updated[index].email = e.target.value;
                    setTeamRoster(updated);
                  }}
                />
                <TextField
                  label="Timezone"
                  value={member.timezone}
                  size="small"
                  onChange={(e) => {
                    const updated = [...teamRoster];
                    updated[index].timezone = e.target.value;
                    setTeamRoster(updated);
                  }}
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    const updated = [...teamRoster];
                    updated.splice(index, 1);
                    setTeamRoster(updated);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            ))}

            {/* Add New Member Form */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "1rem",
                alignItems: "center",
              }}
            >
              <TextField
                label="Name"
                value={newMember.name}
                size="small"
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
              <TextField
                label="Role"
                value={newMember.role}
                size="small"
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
              />
              <TextField
                label="Email"
                value={newMember.email}
                size="small"
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
              <TextField
                label="Timezone"
                value={newMember.timezone}
                size="small"
                onChange={(e) =>
                  setNewMember({ ...newMember, timezone: e.target.value })
                }
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (newMember.name && newMember.role) {
                    setTeamRoster([...teamRoster, newMember]);
                    setNewMember({
                      name: "",
                      role: "",
                      email: "",
                      timezone: "",
                    });
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
