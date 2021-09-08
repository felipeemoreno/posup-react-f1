import { useEffect, useState } from 'react';
import './styles/global.scss';

import DriversList from './components/DriversList';
import DriverInfos from './components/DriverInfos';


function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState([]);

  //chamdas API
  async function fetchDriversList () {
    await fetch("http://ergast.com/api/f1/drivers.json?limit=1000")
    .then(response => response.json())
    .then(
      (data) => {
        setIsLoaded(true);
        const driversList = data.MRData.DriverTable.Drivers;
        const drivers = driversList.map(driver => {
          return {
            id: driver.driverId,
            name: `${driver.givenName} ${driver.familyName}`,
          }
        })
        setDrivers(drivers);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  useEffect ( () => {
    fetchDriversList();
  }, [])

  const handleDriver = (driver) => {
    setDriver(driver);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Carregando...</div>;
  } else {
    return (
      <>
        <header>
          <h1>F1 APP</h1>
          <p>Busque um piloto e veja sua estatísticas.</p>
        </header>

        <DriversList
          drivers={drivers}
          handleDriver={handleDriver} />

        {driver.length !== 0 && <DriverInfos driver={driver} />}

      </>
    );
  }
}

export default App;
