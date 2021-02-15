import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      //color: theme.palette.type? "black": "white",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: "10%"
    },
    field: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: "10%"
    },
  }),
);

export default function WeatherMain(props : any){
    const classes = useStyles();
    var timeoutRef: any; 
    let [data, setData] = React.useState<any>(null);
    let [text, setText] = React.useState<string>("");
    const getWeatherData = async (value: any) =>{
        //call weather api to get data by city, state, country code 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${props.APIkey}&units=imperial`);
        //Convert response nto something we can use. 
        const body = await response.json();
        //If it's valid save the data. 
        if(body.cod === 200){
          setData(body);
        }
        
    }
    const typing = (value: string) =>{
        ///Clear timeout 
        clearTimeout(timeoutRef);
        //Call method in a bit
        timeoutRef = setTimeout(() => getWeatherData(value), 1000);
    }
    const proccessPosition=async(position: any)=>{
      //Get location from coordinates
      const temp = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${props.APIkey}&units=imperial`;
      const response = await fetch(temp);
      const body = await response.json();
      if(body.cod === 200){
        setData(body);   
      }
      setText(body.name);
      
    }
    const getLocation=() =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(proccessPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    return <div className={classes.root} >
         <Grid container spacing={3} alignItems="center" justify="center">
           <Grid item className={classes.field} sm={12} xs={12} lg={4} md={4}>
             <TextField fullWidth label="Enter City, State, Country Code" value={text} onChange={(e: any)=> {setText(e.target.value); typing(e.target.value);}} 
                     InputProps={{
                      endAdornment: <MyLocationIcon onClick={()=>{getLocation()}}/>
                      }}
                    />
           </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
                <div className={classes.paper}>
                     
                    
                    {data !== null? <div style={{marginTop: "1vh"}}>
                        <Typography>{data.name}</Typography>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main}/>
                        <Typography>{data.weather[0].main}</Typography>
                        <Typography>{Math.round(data.main.temp)}&#176;</Typography>
                        <Typography>High / Low: {Math.round(data.main.temp_max)}&#176; / {Math.round(data.main.temp_min)} &#176;</Typography>
                      </div>:
                    null}
                </div>
            </Grid>
        </Grid>
    </div>
}