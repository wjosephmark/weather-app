import React, { useState, useEffect } from "react";

export default function App(){

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [icon, setIcon] = useState('')
  const [responseRecieved, setResponseRecieved] = useState(false)
  
  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        setIcon(result.weather[0].icon)
        setResponseRecieved(true)
        console.log(result)
        console.log(result.main.temp)
      })
    }
  }

  const displayContent = () => {
    if(typeof weather.main != "undefined"){
      return(
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
      )
    } else if(weather.cod === '404' ){
      return(
        <div className="error-message">
          <h1>Location Not Found :(</h1>
        </div>
      )
    }
  }
  
  const handleClassName = () => {
    if(responseRecieved === true){
      if(icon.includes('n')) {
        return("app-night")
      } else if (weather.main.temp < 50) {
        return("app-cold")
      } else {
        return('app')
      }
    } else {
      return('app')
    }
  }

  const displayWeatherImage = () => {
    return(<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />)
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
    <div className={handleClassName()}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {displayContent()}
      </main>
    </div>
  );
}