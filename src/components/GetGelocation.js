import React, { useState, useEffect } from 'react';
import '../style.css'

const UseGeolocation = () =>{
    /*Se generan la fecha para mostrar en el renderizado*/
    const dateBuilder = (d) => {
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }
       
    /*Al obtener los valores de la Api Openweather se almacena en esta constate useState*/
     
    const[weather,setWeather] = useState({});
    const[value, setValue] = useState(0);
    
   
   /*Key de la Api de Openweather */
    const api = {
        key: "008188f258c81bafdf880fc394d65415",
    } 
  
    const changeValue = () => {
        setValue(weather.main.temp - 273.15)
        console.log(value);
    }
   
    
    /*Obtener los datos de la Api*/
    useEffect(async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => setWeather(result));
          });
    },[]);

   

        return <i class="fas fa-cloud-sun"></i>;
    }

    return (
        <main className="main-box">
        {(typeof weather.main !== 'undefined') ? (
            <div className="center">
                <h2>Weather App</h2>
                <div className="location-box">
                    
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">{Math.round((weather.main.temp - 273.15))}°c</div>
                    <div className="weather">{weather.weather[0].main}</div>
                    <div className="weather">{weather.weather[0].description}</div>
                    <div className="weather-icon"><setIcon value={weather.weather.id}/></div> 
                </div>
                <button className="weather-button" onClick={changeValue}>Click to convert Celsius to Fahrenheit</button>
                
            </div>
        ) : (<div className="Alert"><i class="fas fa-arrow-up"></i> Please, Activate allow the location on your Browser...</div>)}
       </main>
    )
}

export default UseGeolocation;