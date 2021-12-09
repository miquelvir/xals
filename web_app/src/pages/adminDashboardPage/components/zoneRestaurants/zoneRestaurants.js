import React from "react";
import Zone from "../zone/zone";
import Restaurant from "../restaurant/restaurant";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { useEffect } from "react";
import { useCollectionState } from "../../../../hooks/useCollectionState/useCollectionState";
import { useSnackbar} from 'notistack';
import { questionContext } from "../../../../contexts/questionContext";
import { getRestaurants, postRestaurant } from "../../services/restaurants";
import {useTranslation} from "react-i18next";

export const ZoneRestaurants = ({ setRestaurant }) => {
    const [restaurants, setRestaurants, restaurantsUtils] = useCollectionState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const question = React.useContext(questionContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
      getRestaurants()
        .then((restaurants) => setRestaurants(restaurants))
        .catch(_ => enqueueSnackbar(t("unableGetRests"), { variant: 'error' }))
    }, []);
  
    const handleNewRestaurant = () => {
      question.prompt({
        title: t("restName"), description: t("newRestDescription"),
        handleSubmit: (name) => {
          return new Promise(function (resolve, reject) {
            postRestaurant(name).then((restaurant) => {
              restaurantsUtils.add(restaurant);
              enqueueSnackbar(t("addRest"), { variant: 'success' });
              resolve();
            }).catch(() => {
              enqueueSnackbar(t("unableAddRest"), { variant: 'error' });
              reject();
            })
          })
        }, handleCancel: () => enqueueSnackbar(t("cancelled"), { variant: 'warning' })
      })
    };
  
    return <Zone title="restaurants">
      <div className='grid grid-cols-1 divide-y divide-gray-500'>
        {restaurants.map(restaurant => (
          <Restaurant key={restaurant.id} patchRestaurant={restaurantsUtils.patch} deleteRestaurant={restaurantsUtils.remove} restaurant={restaurant} setRestaurant={setRestaurant} />
        ))}
      </div>
      <div className='grid justify-items-center pt-8'>
        <YesButton onClick={handleNewRestaurant} text={t("ADD NEW")} w='w-64' />
      </div>
  
    </Zone>
  }
  