import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ClientHeader from "../comps/ClientHeader";
import StatusSummary from "../comps/StatusSummary";
import GoogleDocPreview from "../comps/GoogleDocPreview";
import TaskBoard from "../comps/TaskBoard";
import MilestoneSection from "../comps/MilestoneSection";
import StatusUpdateInput from "../comps/StatusUpdateInput";
import PersistentLinks from "../comps/PersistentLinks";
import links from "../data/mockLinks";
import ProgressGallery from "../comps/ProgressGallery";
import CalendarView from "../comps/CalendarView";
import PinnedStatusBar from "../comps/PinnedStatusBar";
import TeamRoster from "../comps/TeamRoster";

export default function ClientUpdatePage({
  tasks,
  milestones,
  statusUpdates,
  progressItems,
  pinnedStatus,
  teamRoster,
}) {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 4 }}>
      <ClientHeader clientName="Wild Montana" />
      {/* <PinnedStatusBar phase={2} totalPhases={4} launchDate="June 5, 2025" /> */}

      {pinnedStatus?.show && (
        <PinnedStatusBar
          phase={pinnedStatus.phase}
          totalPhases={pinnedStatus.totalPhases}
          launchDate={pinnedStatus.launchDate}
        />
      )}

      {teamRoster?.length > 0 && <TeamRoster team={teamRoster} />}

      <StatusSummary text="We've been focusing on building out the notes section, incorporating key functionalities that will enhance user interaction and improve data management." />
      <ProgressGallery items={progressItems} />
      {/* <CalendarView tasks={tasks} /> */}

      <PersistentLinks links={links} />

      <GoogleDocPreview url="https://docs.google.com/document/..." />

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Task Overview
        </Typography>
        <TaskBoard tasks={tasks} />
      </Box>

      <Box mt={4}>
        <MilestoneSection milestones={milestones} tasks={tasks} />
      </Box>

      <Box mt={4}>
        <StatusUpdateInput
          onSubmit={(text) => console.log("Update submitted:", text)}
        />
      </Box>
    </Container>
  );
}
