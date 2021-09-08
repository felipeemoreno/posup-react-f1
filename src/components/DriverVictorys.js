import { useEffect, useState } from 'react';

function DriverVictorys(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [driverVictorys, setDriverVictorys] = useState([]);

  const { driver } = props;

  async function fetchDriverSeasons (driverId) {
    await fetch(`https://ergast.com/api/f1/drivers/${driverId}/results/1.json?limit=1000`)
            .then(response => response.json())
            .then(
              (data) => {
                setIsLoaded(true);
                const result = data.MRData.RaceTable.Races;
                setDriverVictorys(result);
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
        <h3>Vitorias</h3>
        <ul>
          {driverVictorys.map((victory, index) => (
            <li key={index}>{victory.season} - {victory.raceName}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DriverVictorys;
