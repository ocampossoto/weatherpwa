import React, {Suspense} from 'react';
// import './App.css';
import firebase from 'firebase/app'
import "firebase/database"
import DarkTheme from "./darktheme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Grid, Button } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from '@material-ui/core/CircularProgress';
const WeatherMain = React.lazy(() => import('./weatherMain'));
const firebaseConfig = {
  apiKey: "AIzaSyCFzMeckRfCYw29HFUfHRslnXPrN-Wuz-M",
  authDomain: "weatherappproj2021.firebaseapp.com",
  projectId: "weatherappproj2021",
  storageBucket: "weatherappproj2021.appspot.com",
  messagingSenderId: "266354659024",
  appId: "1:266354659024:web:1ddbe6ca228646f75f18d5",
  measurementId: "G-HY17J2PGFX"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [key, setKey] = React.useState();
  const [darkState, setDarkState] = React.useState(false);
  let darkTheme:any = DarkTheme(darkState);
  let darkmode:boolean = false;
  React.useEffect(()=>{
    setDarkState(darkmode)
  },[darkmode])
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  React.useEffect(()=>{
    firebase.database().ref("weatherAPIKEY").once('value').then((snapshot) => {
      setKey(snapshot.val());

    });
    
  },[])

  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Grid container alignItems="center" justify="center" >
      <Grid item lg={12} md={12} sm={12} xs={12} style={{justifyContent: "center", textAlign: "center", paddingTop: "5%"}}>
        
        <Button variant="contained" onClick={() => {handleThemeChange()}}>{darkState? "Light Theme": "Dark Theme"}</Button>
      </Grid>
      <Suspense fallback={
          <CircularProgress 
            style={{marginTop: "25%",marginBottom: "30%", marginLeft: "50%", justifyContent: "center"}} 
            color="inherit"/>}>
            <WeatherMain APIkey={key} />
          
        </Suspense>
    
        
      </Grid>
    </ThemeProvider>
  );
}

export default App;
