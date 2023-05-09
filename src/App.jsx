import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const ApiKey = '15e7b77f74cce1b303a4522ecfc9785d'

  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")


  const getWeather = (e) => {
    if(e.key === 'Enter'){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?&appid=${ApiKey}&q=${city}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data);
        setCity('')
      }) 
      .catch(error => {
        console.log(error)
        setWeatherData({})
      })
    }
    else return null;
  }

  return (
    <div className="App">
      <div className='container'>
        <input 
        type="text" 
        placeholder='Enter city...'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyDown={getWeather}
        />
        {
          typeof weatherData.main === "undefined" ? 
            <div>
              <p className='null-p'>Welcome to weather app! Enter a city to get the weather of.</p>
            </div>
          : 
            <div className='weather-data'>
              <p className='city'>{weatherData.name}</p>
              <p className='temp'>{weatherData.main.temp.toFixed()}°C</p>
              <p className='weather'>{weatherData.weather[0].main}</p>
            </div>
        }

      </div>
    </div>
  );
}

export default App;
