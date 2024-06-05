import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


function WeatherApp() {
    let api_key = "589d2c79d25fc719d070de46c9b6b1c9";
    
    const[wicon,seticon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
        let response = await fetch(url);
        let data = await response.json();
    
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
    
        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + "km/h";
        temp[0].innerHTML = data.main.temp + "°c";
        location[0].innerHTML = data.name;
    
        if (data.weather && data.weather.length > 0) {
            const weatherCode = data.weather[0].icon;
    
            if (weatherCode === "01d" || weatherCode === "01n") {
                seticon(clear_icon);
            } else if (weatherCode === "02d" || weatherCode === "02n") {
                seticon(cloud_icon);
            } else if (weatherCode === "03d" || weatherCode === "03n") {
                seticon(drizzle_icon);
            } else if (weatherCode === "04d" || weatherCode === "04n") {
                seticon(drizzle_icon);
            } else if (weatherCode === "09d" || weatherCode === "09n" || weatherCode === "10d" || weatherCode === "10n") {
                seticon(rain_icon);
            } else if (weatherCode === "13d" || weatherCode === "13n") {
                seticon(snow_icon);
            } else {
                seticon(clear_icon);
            }
        } else {
            
        }
    }
    
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='search'></input>
            <div className='search-icon' onClick={()=>{search()}}>
                <img src = {search_icon} alt = ""/>
            </div>
        </div>
        <div className='weather-image'>
            <img src= {wicon} alt=""/>
        </div>
        <div className='weather-temp'>24°c</div>
        <div className='weather-location'>London</div>
        <div className='data-container'>
            <div className='element'>
                <img src = {humidity_icon} alt = "" className='icon'/>
                <div className='data'>
                    <div className='humidity-percent'>64%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src = {wind_icon} alt = "" className='icon'/>
                <div className='data'>
                    <div className='wind-rate'>18 km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default WeatherApp
