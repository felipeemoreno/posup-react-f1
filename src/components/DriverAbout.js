import { useEffect, useState } from 'react';

const DriverAbout = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [driverAbout, setDriverAbout] = useState([]);

  const { driver } = props;

  async function fetchAboutDriver (driverId) {
    await fetch(`http://ergast.com/api/f1/drivers/${driverId}.json`)
            .then(response => response.json())
            .then(
              (data) => {
                setIsLoaded(true);
                const result = data.MRData.DriverTable.Drivers[0];
                setDriverAbout(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )
  }

  useEffect(() => {
    fetchAboutDriver(driver.id);
  }, [driver])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Carregando...</div>;
  } else {
    return (
      <div>
        <h3>Sobre o Piloto</h3>
        <div>
          <b>Nome:</b> {driverAbout.givenName} {driverAbout.familyName} <br/>
          <b>Nascimento:</b> {driverAbout.dateOfBirth}</div>
      </div>
    )
  }
}

export default DriverAbout;
