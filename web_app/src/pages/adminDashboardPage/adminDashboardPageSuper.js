import React, { useEffect } from 'react';
import Zone from './components/zone/zone';
import YesButton from '../../components/buttons/yesButton/yesButton';
import Restaurant from './components/restaurant/restaurant';
import Admin from './components/admin/admin';
import { deleteRestaurant, getRestaurants } from './services/restaurants';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { postRestaurant } from './services/restaurants';
import { confirmContext } from '../../contexts/confirmContext';
import { questionContext } from '../../contexts/questionContext';
import { useCollectionState } from '../../hooks/useCollectionState/useCollectionState';
import { getSuperAdministrators, deleteSuperAdministrator, postSuperAdministrator } from './services/superAdministrators';

const ZoneRestaurants = ({ setRestaurant }) => {
  const [restaurants, setRestaurants, restaurantsUtils] = useCollectionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const question = React.useContext(questionContext);

  useEffect(() => {
    getRestaurants()
      .then((restaurants) => setRestaurants(restaurants))
      .catch(_ => enqueueSnackbar("unable to retrieve restaurants", { variant: 'error' }))
  }, []);

  const handleNewRestaurant = () => {
    question.prompt({
      title: "restaurant name", description: "this will add a new restaurant to the system",
      handleSubmit: (name) => {
        return new Promise(function (resolve, reject) {
          postRestaurant(name).then((restaurant) => {
            restaurantsUtils.add(restaurant);
            enqueueSnackbar("added new restaurant", { variant: 'success' });
            resolve();
          }).catch(() => {
            enqueueSnackbar("unable to add new restaurant", { variant: 'error' });
            reject();
          })
        })
      }, handleCancel: () => enqueueSnackbar("cancelled", { variant: 'warning' })
    })
  };

  return <Zone title="restaurants">
    <div className='grid grid-cols-1 divide-y divide-gray-500'>
      {restaurants.map(restaurant => (
        <Restaurant key={restaurant.id} patchRestaurant={restaurantsUtils.patch} deleteRestaurant={restaurantsUtils.remove} restaurant={restaurant} setRestaurant={setRestaurant} />
      ))}
    </div>
    <div className='grid justify-items-center pt-8'>
      <YesButton onClick={handleNewRestaurant} text={"ADD NEW"} w='w-64' />
    </div>

  </Zone>
}

const ZoneRootAdministrators = ({ privacyFilter }) => {
  const [administrators, setAdministrators, administratorUtils] = useCollectionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const question = React.useContext(questionContext);

  useEffect(() => {
    getSuperAdministrators()
      .then((administators) => setAdministrators(administators))
      .catch(_ => enqueueSnackbar("unable to retrieve root administrators", { variant: 'error' }))
  }, []);

  const handleNewAdministrator = () => {
    question.prompt({
      title: "administrator email", description: "this will add a new root administrator to the system; root administrators have complete access to all restaurants and users (including other administrators)",
      handleSubmit: (email) => {
        return new Promise(function (resolve, reject) {
          postSuperAdministrator(email).then((administrator) => {
            administratorUtils.add(administrator);
            enqueueSnackbar("added new root administrator", { variant: 'success' });
            resolve();
          }).catch(() => {
            enqueueSnackbar("unable to add new root administrator", { variant: 'error' });
            reject();
          })
        })
      }, handleCancel: () => enqueueSnackbar("cancelled", { variant: 'warning' })
    })
  };

  return <Zone title="root administrators">
    <div className='grid grid-cols-1 divide-y divide-gray-500'>
      {administrators.map(administrator => (
        <Admin key={administrator.id} admin={administrator} privacyFilter={privacyFilter} deleteAdministrator={administratorUtils.remove}/>
      ))}
    </div>
    <div className='grid justify-items-center  pt-8'>
      <YesButton onClick={handleNewAdministrator} text={"ADD NEW"} w='w-64' />
    </div>

  </Zone>
}

function AdminDashboardPageSuper({ privacyFilter, setRestaurant }) {
  return <React.Fragment>
    <ZoneRestaurants setRestaurant={setRestaurant} />
    <ZoneRootAdministrators privacyFilter={privacyFilter} />
  </React.Fragment>
}

export default AdminDashboardPageSuper;

