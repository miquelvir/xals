import React from 'react';
import {ZoneHistoric} from './components/zoneHistoric/zoneHistoric';
import { ZonePerCourse } from './components/zonePerCourse/zonePerCourse';
import { ZoneFilters} from './components/zoneFilters/zoneFilters';
function AdminDashboardPageRestaurantStatistics({ restaurant }) {

  return <React.Fragment>
    <ZoneFilters />
    <ZoneHistoric restaurantId={restaurant.id} />
    <ZonePerCourse restaurantId={restaurant.id} />
  </React.Fragment>
}

export default AdminDashboardPageRestaurantStatistics;

