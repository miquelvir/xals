import React from "react";
import Zone from "../zone/zone";
import Restaurant from "../restaurant/restaurant";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { useEffect } from "react";
import { useCollectionState } from "../../../../hooks/useCollectionState/useCollectionState";
import { useSnackbar} from 'notistack';
import { questionContext } from "../../../../contexts/questionContext";
import { getRestaurants, postRestaurant } from "../../services/restaurants";

export const ZoneRestaurants = ({ setRestaurant }) => {
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
  