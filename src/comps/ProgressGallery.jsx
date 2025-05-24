import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@mui/material";

export default function ProgressGallery({ items = [] }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Progress Gallery
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No updates yet.
        </Typography>
      ) : (
        <Box display="flex" flexWrap="" gap={2}>
          {items.map((item, index) => (
            <Card key={index} sx={{ width: 320 }}>
              {item.type === "image" && (
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={item.caption}
                  height="180"
                />
              )}

              {item.type === "video" && item.url.includes("loom.com") && (
                <Box display="flex" flex="2" gap={2}>
                  <iframe
                    src={item.url.replace("loom.com/share/", "loom.com/embed/")}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "8px",
                    }}
                    title={item.caption}
                  />
                </Box>
              )}

              {item.type === "link" && (
                <CardContent>
                  <Link href={item.url} target="_blank" rel="noopener">
                    {item.caption || "View Link"}
                  </Link>
                </CardContent>
              )}

              <CardContent>
                <Typography variant="body2" gutterBottom>
                  {item.caption}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.timestamp).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
