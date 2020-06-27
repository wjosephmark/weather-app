import React, { useState, useEffect } from "react";

export default function App(){

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [skies, setSkies] = useState('')

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          setSkies(result.weather[0].description)
          console.log(result)
          console.log(result.weather[0].description)
        })
    }
  }

  const displayWeatherImage = () => {
    if(skies === "Clouds"){
      return(
        <img className="weather-image" src="http://assets.stickpng.com/thumbs/580b585b2edbce24c47b2639.png" />
        // <h1>Hello</h1>
      )
    } else if(skies === "Clear"){
      return(
        <img className="weather-image" src="https://lh3.googleusercontent.com/proxy/T36WuGYfY86TmoopZqlZcuK0oWnIvbrpeMgfjxsuimqmiSZuWLWoAmdtB4Q2Fcbs_5yA4HfEpOxD3NdThMI4hcCLFMxN0TU" />
      )
    } else if(skies === "Rain"){
      return(
        <img className="weather-image" src="http://assets.stickpng.com/thumbs/580b585b2edbce24c47b2710.png" />
      )
    }
  }

  const api = {
    key: "f933595f4ec128352b97f105a1a4faa8",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    
    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="info-wrapper">
            <div className="location-wrapper">

              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            
              <div className="date">
                {dateBuilder(new Date())}
              </div>

            </div>

            <div className="temp-wrapper">

              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>

              <div className="weather">
                {displayWeatherImage()}
                {weather.weather[0].description}
              </div>

            </div>


          </div>
        ) : ('')}
      </main>
    </div>
  );
}
