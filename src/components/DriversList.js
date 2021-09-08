import { useEffect, useState } from 'react';

function DriversList(props) {

  const [driverSearch, setDriverSearch] = useState([]);
  const [inputDriver, setInputDriver ] = useState({name: '', id: ''});

  const { drivers, handleDriver } = props;


  useEffect(() => {
    inputDriver.id && handleDriver(inputDriver);
  }, [inputDriver]);


  const handleChangeSeach = (event) => {
    const searchText = event.target.value;
    setInputDriver(searchText);

    if ( !searchText.length ){
      setDriverSearch([]);
      return false
    }

    const driversResults = drivers.filter(driver => driver.name.toLowerCase().search(searchText.toLowerCase()) !== -1);
    setDriverSearch(driversResults);
  }

  const handleDriverListClick = (driverId, driverFullName) => {
    setInputDriver({
      name: driverFullName,
      id: driverId
    });
    setDriverSearch([]);
  }

  return (
    <div className="formSearch">
      <h1>Buscar Piloto</h1>
      <form>
        Piloto: <input type="text" onChange={handleChangeSeach} value={inputDriver.name} />
        <input type="hidden" value={inputDriver} name="driver" />

        <div className="searchList">
          <ul >
            {driverSearch.map(driver => (
              <li onClick={() => handleDriverListClick(driver.id, driver.name)} key={driver.id}>{ driver.name }</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  )
}

export default DriversList;
