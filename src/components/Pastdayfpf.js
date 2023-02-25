import React from 'react'
import { useState, useEffect } from "react"

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

export default function Pastdayfpf() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [highestMagnitude, setHighestMagnitude] = useState(null);
  const [highestMagnitudeLocation, setHighestMagnitudeLocation] = useState(null);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setEarthquakes(data.features))
      .catch((error) => console.log(error));
  }, []);

  const getHighestMagnitude = () => {
    const highestMagnitude = Math.max(...earthquakes.map((earthquake) => earthquake.properties.mag));
    const highestMagnitudeEQ = earthquakes.find((earthquake) => earthquake.properties.mag === highestMagnitude);
    setHighestMagnitude(highestMagnitude);
    setHighestMagnitudeLocation(highestMagnitudeEQ.properties.place);
  };

  const TimeTolocal = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <div className="content">
      <h1>Earthquakes past day</h1>
      <button onClick={getHighestMagnitude}>Find highest magnitude earthquake</button>
        <label>
          <input type="checkbox" checked={showTime} onChange={(e) => setShowTime(e.target.checked)} />
          Show time of earthquake
        </label>
        {highestMagnitude && (
        <div className="highest">
          The highest magnitude earthquake happened at {highestMagnitudeLocation} with a magnitude of {highestMagnitude}
        </div>
      )}
      <ul>
        {earthquakes.map((earthquake, index) => (
          <li
            key={index}
            style={earthquake.properties.mag === highestMagnitude ? { boxShadow: "5px 5px 5px black", backgroundColor: "green" } : {}}
          >
            <span>Location:</span> {earthquake.properties.place} - <span>Magnitude:</span> {earthquake.properties.mag}
            {showTime && (
              <span className="time">
                {" "}
                - Time {TimeTolocal(earthquake.properties.time)} 
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
