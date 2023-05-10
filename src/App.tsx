import React, { useRef, useState } from "react";
import "./App.css";
import { FileUploader } from "./components/FileUploader";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { ZipUtils } from "./utils/zip";
import { eventWithTime } from "@rrweb/types";

const fs = window.require("fs");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [events, setEvents] = useState<eventWithTime[]>([]);

  const playerRef = useRef();

  const handleChange = (file: any) => {
    console.log(file);

    const contents = fs.readFileSync(file.path, "utf8");
    const json = JSON.parse(contents);
    const rawEvents = json.events;
    const events: eventWithTime[] = rawEvents.map((event: any) =>
      ZipUtils.tryUnpack(event)
    );

    (playerRef.current as any)?.destroy();

    setEvents(events);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Header />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <FileUploader handleChange={handleChange} />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Player events={events} ref={playerRef} />
    </div>
  );
}

export default App;
