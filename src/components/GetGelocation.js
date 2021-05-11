import React, { useState, useEffect } from 'react';
import '../style.css'



const UseGeolocation = () =>{
    const dataBuilder = (d) => {
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const[weather, setWeather] = useState({});

    const search = e => {
        if(e.key === "Enter") {
            fetch(`${api.base}weather?lat=${location.coordinates.lat}=${location.coordinates.lng}=${api.key}`)
            .then(res => res.json())
            .then(result => setWeather(result));
        }
    }

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lng: ""},
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude, 
                lng: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }
    /* */
    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation is not supported for this browser",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }, []);

    const api = {
        key: "a391207dcc3d3993ec079568479aea35",
        base: "https://api.openweathermap.org/data/2.5/",
    }
    
        
     
    return (
            <div className="weather-main">
                <div className="location-box">
                    <div className="location">El Aguajito, Mx</div>
                    <div className="date">{dataBuilder(new Date())}</div> 
                </div>
                <div className="weather-box">
                    <div className="temp">{Math.round(20.13)}°c</div>
                    <div className="weather">clear sky</div>
                    <div className="weather-icon"></div>
                </div>
            </div>
    );
}

export default UseGeolocation;