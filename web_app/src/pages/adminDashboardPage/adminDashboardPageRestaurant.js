import React from 'react';
import { userContext } from '../../contexts/userContext';
import { ZoneAccessTokens } from './components/zoneAccessTokens/zoneAccessTokens';
import { ZoneDefaultTables } from './components/zoneDefaultTables/zoneDefaultTables';
import { ZoneRestaurantAdministrators } from './components/zoneRestaurantAdministrators/zoneRestaurantAdministrators';
import { ZoneTimeProfile } from './components/zoneTimeProfile/zoneTimeProfile';

function AdminDashboardPageRestaurant({ privacyFilter, restaurant }) {
  const userCtx = React.useContext(userContext);

  return <React.Fragment>
    <ZoneDefaultTables restaurantId={restaurant.id} />
    <ZoneAccessTokens privacyFilter={privacyFilter}  restaurantId={restaurant.id} />
    <ZoneTimeProfile restaurantId={restaurant.id} />
    {userCtx.isSuperAdminLoggedIn && <ZoneRestaurantAdministrators privacyFilter={privacyFilter} restaurantId={restaurant.id} />}
  </React.Fragment>
}

export default AdminDashboardPageRestaurant;

