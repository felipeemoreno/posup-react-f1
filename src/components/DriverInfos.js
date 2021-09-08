import DriverAbout from "./DriverAbout";
import DriverSeasons from "./DriverSeasons";
import DriverVictorys from "./DriverVictorys";

const DriverInfos = (props) => {
  const { driver } = props;

  return (
    <>
    <div><h2>Resultado</h2></div>
    <div className="row">
      <DriverAbout driver={driver} />
      <DriverSeasons driver={driver} />
      <DriverVictorys driver={driver} />
    </div>
    </>
  )

}

export default DriverInfos;
