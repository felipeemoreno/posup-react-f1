import { useEffect, useState } from 'react';

function DriverSeasons(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [driverSeasons, setDriverSeasons] = useState([]);

  const { driver } = props;

  async function fetchDriverSeasons (driverId) {
    await fetch(`https://ergast.com/api/f1/drivers/${driverId}/seasons.json?limit=1000`)
            .then(response => response.json())
            .then(
              (data) => {
                setIsLoaded(true);
                const result = data.MRData.SeasonTable.Seasons;
                setDriverSeasons(result);
                console.log(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )
  }

  useEffect(() => {
    fetchDriverSeasons(driver.id);
  }, [driver])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Carregando...</div>;
  } else {
    return (
      <div>
        <h3>Temporadas na F1</h3>
        <ul>
          {driverSeasons.map(season => (
            <li key={season.season}>{season.season}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DriverSeasons
