import React, {useState, useEffect} from 'react'
import axios from 'axios'



const CountryList = ({country}) => {
  const [show, setShow] = useState(false)

  const handleButtonClick = () => setShow(!show)

  if (show) {
    return (
      <div>
        {country.name}{" "}
        <button onClick={handleButtonClick}>{show ?"Hide":"Show"}</button>
        <Country country={country}/>
      </div>
    )
  }

  return (
    <div>
      {country.name}{" "}
      <button onClick={handleButtonClick}>{show ? "Hide" : "Show"}</button>

    </div>
  )
  }


const Country = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather([response.data])
      }).catch(error => {
        console.log(error)
      })
  })

  if (weather.length > 0) {
    const currentWeather = weather[0].current 
    return (
      <div>
      <h1>{country.name}</h1>
      <div><strong>Capital</strong> {country.capital}</div>
      <div><strong>Population</strong> {country.population}</div>
      <h3>Languages</h3>
      <ul>
      {country.languages.map((obj,i) => <li key={i}>{obj.name}</li>)}
      </ul>
      <img src={country.flag} width='200' height='125'/>
      <h2>Weather in {country.capital}</h2>
      
      <p><strong>Temperature </strong>{currentWeather.temperature} Celsius</p>
      <img src={currentWeather.weather_icons[0]} alt='Weather Icon'></img>
      <p>
        <strong>Wind </strong> {currentWeather.wind_speed} mph Direction {currentWeather.wind_dir}
      </p>
    </div>
    )
  } 

  return (
    <div>
      <h1>{country.name}</h1>
      <div><strong>Capital</strong> {country.capital}</div>
      <div><strong>Population</strong> {country.population}</div>
      <h3>Languages</h3>
      <ul>
      {country.languages.map((obj,i) => <li key={i}>{obj.name}</li>)}
      </ul>
      <img src={country.flag} width='200' height='125'/>
    </div>
  )
}

const CountryToShowList = ({countryToShow}) => {
  if (countryToShow.length === 1) {
    return (
      <div>
        <Country country={countryToShow[0]}/>
      </div>
    )
  }
  return (
    <div>
      {countryToShow.length > 10 
        ? "Too many matches, specify another filter"
        : countryToShow.map((country) => (
          <div key={country.name}>
            <CountryList country={country}/>
          </div>
        ))
      }
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryMatch, setCountryMatch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setCountryMatch(event.target.value)
  }

  const countryToShow = countryMatch
      ? countries.filter(country => country.name.toLowerCase().includes(countryMatch.toLowerCase()))
      : countries
  
  return (
    <div>
      Find Countries: <input onChange={handleFilterChange}/>
      <CountryToShowList countryToShow={countryToShow}/>      
    </div>
  );
}

export default App;
