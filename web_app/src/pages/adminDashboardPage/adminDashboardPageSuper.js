import React, { useEffect } from 'react';
import { ZoneRootAdministrators } from './components/zoneRootAdministrators/zoneRootAdministrators';
import { ZoneRestaurants } from './components/zoneRestaurants/zoneRestaurants';

function AdminDashboardPageSuper({ privacyFilter, setRestaurant }) {
  return <React.Fragment>
    <ZoneRestaurants setRestaurant={setRestaurant} />
    <ZoneRootAdministrators privacyFilter={privacyFilter} />
  </React.Fragment>
}

export default AdminDashboardPageSuper;

