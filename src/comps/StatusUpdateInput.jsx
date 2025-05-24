import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function StatusUpdateInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <Box>
      <TextField
        label="Anything unclear? Let us know..."
        multiline
        fullWidth
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box mt={2}>
        <Button variant="contained" onClick={handleSend}>
          Share Update
        </Button>
      </Box>
    </Box>
  );
}
