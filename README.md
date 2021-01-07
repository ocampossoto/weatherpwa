![Deployed](https://github.com/ocampossoto/weatherpwa/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg)

# weatherpwa
A simple website that tells you the current weather when you provide a city or your location. It uses the [Open Weather Map API](https://openweathermap.org/ "Open Weather Map API") to get the current weater.
Live website: [Here](https://ocampossoto-weather.web.app/ "Weather App")

## Features
- Progressive Web App (PWA) you can install it as an app on any device that supports it. 
- Uses the browser location API to get the users location. 

## Tech
- React (TypeScript) 
- Firebase
  - Hosting the static files
  - Storing and providing API keys
- GitHub Actions to deploy to Firebase using CI/CD
