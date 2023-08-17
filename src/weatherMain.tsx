import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Grid, TextField, Typography } from "@mui/material";
export default function WeatherMain() {
  let timeoutRef: NodeJS.Timeout;
  const [key, setKey] = useState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    onValue(ref(getDatabase(), "weatherAPIKEY"), (snapshot) => {
      setKey(snapshot.val());
    });
  }, []);
  const getWeatherData = async (value: string) => {
    //call weather api to get data by city, state, country code
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=imperial`
    );
    //Convert response nto something we can use.
    const body = await response.json();
    //If it's valid save the data.
    if (body.cod === 200) {
      setData(body);
    }
  };
  const typing = (value: string) => {
    ///Clear timeout
    clearTimeout(timeoutRef);
    //Call method in a bit
    timeoutRef = setTimeout(() => getWeatherData(value), 1000);
  };
  const processPosition = async (position: GeolocationPosition) => {
    //Get location from coordinates
    const temp = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`;
    const response = await fetch(temp);
    const body = await response.json();
    if (body.cod === 200) {
      setData(body);
    }
    setText(body.name);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(processPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <Grid
      item
      container
      spacing={3}
      alignContent="center"
      justifyContent="center"
    >
      <Grid item sm={12} xs={12} lg={4} md={4}>
        <TextField
          fullWidth
          label="Enter City, State, Country Code"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            typing(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <MyLocationIcon
                onClick={() => {
                  getLocation();
                }}
              />
            ),
          }}
        />
      </Grid>
      {data !== null ? (
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box>
            <Typography>{data.name}</Typography>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
            />
            <Typography>{data.weather[0].main}</Typography>
            <Typography>{Math.round(data.main.temp)}&#176;</Typography>
            <Typography>
              High / Low: {Math.round(data.main.temp_max)}&#176; /{" "}
              {Math.round(data.main.temp_min)} &#176;
            </Typography>
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
