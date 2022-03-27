const request = require('request');


const geocode = (location, callback) => {
    console.log('Location:',location)
    const geoLoc = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?limit=1&access_token=pk.eyJ1IjoiYXR1bGtzaHJlc3RoYSIsImEiOiJjbDB3enRtM3cxbWFnM2pvMjl0MHRnM2s5In0.ZHtRjwz8z_cKrum9nF8zRg'
    request({url:geoLoc,json:true}, (error,{body}) => {
        const {features} = body;
        if(error){
            console.log('Error while calling geolocation',error);
            callback('Unable to connect to location services!',features);
        }else if(features.length === 0){
            console.log('Error in response');
            callback('Unable to find location. Try another search.',features);
        }else{
            console.log("My Features",features);
            if(features.length>0){
                const {center,place_name} = features[0];
                if(center.length === 2){
                    console.log('Place Name ',place_name);
                    const data = {longitude:center[0],latitude:center[1],place_name}
                    callback(error,data);
                }
                else
                console.log('center lngth not valid',center.length);
            }
        }
    })
}

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

  
  const forecast = (lat,long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=01b96bc46721d81e20332d0c648f28f4&query='+lat+','+long+'&units=f'
    request({url,json:true},(error,response) =>{
        if(error){
            callback('Unable to call weather API.');
        }else if(response.body.error){
            callback('Unable to get weather for given location.');
        } else{

            const feelslike  = response.body.current.feelslike
            const descr = response.body.current.weather_descriptions[0]
            const temp = response.body.current.temperature
            const data = {
            "feelslike":feelslike,
            "descr":descr,
            "temp":temp
        }
    
        console.log('%s. It is currently %s degree out. It feels like %s degree.',descr,temp,feelslike);
        callback(error,data);
        }
    })
}
module.exports = {
    geocode:geocode,
    forecast:forecast
}