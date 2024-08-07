import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() 
{
  const [items, setItems] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("imperial")

  let fetchData = async () =>
  {
    try
    {
      let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0aefdfc93e4e342b3c5d88edb87ca5df&units=${unit}`);
      let data = await resp.data;
      // console.log("Data");
      // console.log(typeof data);
      setItems(data);
      // console.log("Items");
      // console.log(items);
    }
    catch (error)
    {
      console.log(error);
    }
  }

  // let fetchForecast = async () =>
  // {
  //   try
  //   {
  //     let resp = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0aefdfc93e4e342b3c5d88edb87ca5df&units=${unit}`);
  //     let data = await resp.data;
  //     setForecast(data.list);
  //     console.log("Forecast");
  //     console.log(forecast)
  //   }
  //   catch (error)
  //   {
  //     console.log(error);
  //   }
  // }

  useEffect(() =>
  {
    fetchData();
    // fetchForecast();
  }, [])

  const cityNameInput = (e) =>
  {
    setCity(e.target.value);
    // console.log(city);
  }

  const selectUnit = (e) =>
  {
    setUnit(e.target.value);
    fetchData();
  }

  const cityNameSubmit = (e) =>
  {
    e.preventDefault();
    console.log(city);
    fetchData();
    // fetchForecast();
  }




  return (
    <div className="container">
      <section className="pt-8">
        <div className="flex justify-center">
          <form className="">
            <input type="text" className="px-1 text-lg" placeholder="Enter city name" onChange={(e) => cityNameInput(e)} />
            <select name="unitTemp" className="text-lg" id="unitTemp" onChange={(e) => selectUnit(e)}>
              <option value="imperial">F</option>
              <option value="metric">C</option>
            </select>
            <button className="text-lg" onClick={cityNameSubmit}>Submit</button>
          </form>
        </div>
      </section>
      
      <section className="pt-8">
      {
        items ? (
          <div className="flex justify-center">
            <div className="card w-2/5 pb-2.5 rounded text-white">
              <h3 className="py-2.5 px-4 bg-black bg-opacity-60 text-xl">{items.name}</h3>
              <div className="flex justify-between">
                <h3 className="py-2.5 px-4 text-6xl align-middle">{items.main.temp}&deg;</h3>
                <img src={`https://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`} alt="" />
              </div>
              <h3 className="py-1 px-4">{new Date(items.dt * 1000).toDateString()}</h3>
              <h3 className="py-1 px-4 capitalize">{items.weather[0].description}</h3>
              <h3 className="py-1 px-4">Feels like {items.main.feels_like}&deg;</h3>
              <h3 className="py-1 px-4">Low: {items.main.temp_min} High: {items.main.temp_max}</h3>
              {/* <h3 className="py-1 px-4">Sunrise: {new Date(items.sys.sunrise * 1000).toTimeString()} </h3>
              <h3 className="py-1 px-4">Sunset: {new Date(items.sys.sunset * 1000).toLocaleTimeString('en-IN')}</h3> */}
            </div>
          </div>
        )

          :

          (
            <h3>Loading...</h3>
          )
      }
      </section>

      {/* {
        forecast.map((forecast) => (
          <div key={forecast.dt}>
            <p>{forecast.dt_txt} Temp: {forecast.main.temp}</p>
          </div>
        ))
      } */}
    </div>
  );
}

export default App;
