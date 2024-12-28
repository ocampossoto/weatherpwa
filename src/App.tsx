import {
  CircularProgress,
  CssBaseline,
  Grid2 as Grid,
  Box,
} from "@mui/material";
import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { Suspense } from "react";
import WeatherMain from "./weatherMain";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCFzMeckRfCYw29HFUfHRslnXPrN-Wuz-M",
  authDomain: "weatherappproj2021.firebaseapp.com",
  projectId: "weatherappproj2021",
  storageBucket: "weatherappproj2021.appspot.com",
  messagingSenderId: "266354659024",
  appId: "1:266354659024:web:1ddbe6ca228646f75f18d5",
  measurementId: "G-HY17J2PGFX",
};

function App() {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  return (
    <Box pt={8}>
      <CssBaseline />
      <Grid
        container
        width="100vw"
        alignContent="center"
        justifyContent="center"
      >
        <Suspense
          fallback={
            <CircularProgress
              style={{
                marginTop: "25%",
                marginBottom: "30%",
                marginLeft: "50%",
                justifyContent: "center",
              }}
              color="inherit"
            />
          }
        >
          <WeatherMain />
        </Suspense>
      </Grid>
    </Box>
  );
}

export default App;
