import React, { useState, useEffect } from 'react';
import '../style.css'




const UseGeolocation = (value , value2) =>{
    /*Se generan la fecha para mostrar en el renderizado*/
    const dataBuilder = (d) => {
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
       
    /*Al obtener los valores de la Api Openweather se almacena en esta constate useState*/
    const[weather, setWeather] = useState({});
    const[position, setPosition] = useState({})
    /*Se solicita el posicionamiento en el navegador y posteriormente se solicita a la api Openweather la informacion de la ubicacion */



    useEffect(async () => {
        navigator.geolocation.getCurrentPosition(success, error);
            const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => setWeather(result));
        /*Key de la Api de Openweather */
        const api = {
            key: "008188f258c81bafdf880fc394d65415",
        } 
    });
    return setWeather;
    
}

export default UseGeolocation;