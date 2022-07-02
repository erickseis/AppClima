import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [celcius, setCelcius] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=789f64ef61a1e1d8be2fb903ea6f19d1`)
        .then(res => {
          setData(res.data)
          const temp = Math.round(res.data.main.temp - 273.15)
          setCelcius(temp)

        })//revisar luego

    }


    navigator.geolocation.getCurrentPosition(success);

  }, [])

  console.log(data);

  const convertTemp = () => {

    if (isFahrenheit) {
      setCelcius((celcius * 9 / 5) + 32);
      setIsFahrenheit(false);
    } else {
      setCelcius((celcius - 32) * 5 / 9);
      setIsFahrenheit(true);
    }

  }

  return (
    <div className='Contenedor-Card'>
      <div className="Card">
        <div className='titulo'>
          <h1> {data.name}, {data.sys?.country}</h1>
        </div>
        <h2>"{data.weather?.[0].description}"</h2>
        <h3>Temp: <p> {celcius} {isFahrenheit ? "C" : "F"}°</p>  </h3>
        <h4>Wind speed <br /> {data.wind?.speed}</h4>
        <h5>Clouds: {data.clouds?.all} %</h5>
       
        <div className='img'>
          <img src={`http://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`} alt="" />
        
        </div>

        <button className='button' onClick={convertTemp}> <strong>Convert Fº / Cº</strong></button>
      </div>
    </div>
  )
}

export default App
