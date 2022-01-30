import React from 'react';
import { userContext } from '../../contexts/userContext';
import { ZoneAccessTokens } from './components/zoneAccessTokens/zoneAccessTokens';
import { ZoneDefaultTables } from './components/zoneDefaultTables/zoneDefaultTables';
import { ZoneRestaurantAdministrators } from './components/zoneRestaurantAdministrators/zoneRestaurantAdministrators';
import { ZoneShortcuts } from './components/zoneShortcuts/zoneShortcuts';
import { ZoneTimeProfile } from './components/zoneTimeProfile/zoneTimeProfile';
import { useState } from 'react';
import AdminDashboardPageRestaurantStatistics from './adminDashboardPageRestaurantStatistics';

const VIEW_HOME = 'home';
const VIEW_STATISTICS = 'stats';

function AdminDashboardPageRestaurant({ privacyFilter, restaurant }) {
  const userCtx = React.useContext(userContext);
  const [view, setView] = useState(VIEW_HOME);

  if (view === VIEW_HOME){
    return <React.Fragment>
    <ZoneShortcuts setView={setView}/>
    <ZoneDefaultTables restaurantId={restaurant.id} />
    <ZoneAccessTokens privacyFilter={privacyFilter}  restaurantId={restaurant.id} />
    <ZoneTimeProfile restaurantId={restaurant.id} />
    {userCtx.isSuperAdminLoggedIn && <ZoneRestaurantAdministrators privacyFilter={privacyFilter} restaurantId={restaurant.id} />}
  </React.Fragment>
  } 
  if (view === VIEW_STATISTICS){
    return <React.Fragment>
      <AdminDashboardPageRestaurantStatistics restaurant={restaurant} />
    </React.Fragment>
  }
  return <React.Fragment>404 - view does not exist</React.Fragment>
}

export default AdminDashboardPageRestaurant;

