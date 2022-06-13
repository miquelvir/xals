import React from 'react';
import {ZoneHistoric} from './components/zoneHistoric/zoneHistoric';
import { ZonePerCourse } from './components/zonePerCourse/zonePerCourse';
import { ZoneFilters} from './components/zoneFilters/zoneFilters';
import {getHistoricStats, getHistoricStatsPerCourse} from "./services/statistics";

const round = (value, decimalPlaces = 0) => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(value * multiplier + Number.EPSILON) / multiplier;
};


function AdminDashboardPageRestaurantStatistics({ restaurant }) {
  const [startDate, setStartDate] = React.useState("2001-01-01")
  const [endDate, setEndDate] = React.useState("3001-01-01")
  const [startTime, setStartTime] = React.useState("00:00")
    const [endTime, setEndTime] = React.useState("23:59")
    const [preparedData, setPreparedData] = React.useState([]);
  const [preparedDataHistoric, setPreparedDataHistoric] = React.useState([]);

  const onSearch = () => {
      if (restaurant.id === undefined || startDate === "" || endDate === "" || startTime === "" || endTime === "") return;

      getHistoricStatsPerCourse(restaurant.id, startTime, endTime, startDate, endDate).then(data => {
          const preparedData = Object.entries(data).map(d => ({
          "course": d[0],
          "waiting time (minutes)": round(d[1] / 60, 2) // to minutes
          }));
          setPreparedData(preparedData)
      })

      getHistoricStats(restaurant.id, startTime, endTime, startDate, endDate).then(data => {
          const preparedData = Object.entries(data).map(d => ({
        "date": d[0],
        "averageWaitingTime": d[1] / 60  // to minutes

      }));
          setPreparedDataHistoric(preparedData)
      })
  }

  return <React.Fragment>
    <ZoneFilters onSearch={onSearch} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime}/>
    <ZoneHistoric restaurantId={restaurant.id} preparedData={preparedDataHistoric}/>
    <ZonePerCourse preparedData={preparedData}  restaurantId={restaurant.id} />
  </React.Fragment>
}

export default AdminDashboardPageRestaurantStatistics;

