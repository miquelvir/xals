import Zone from "../zone/zone";
import { postRestaurantAccessToken, deleteRestaurantAccessToken, patchRestaurantAccessToken, getRestaurantAccessTokens } from "../../services/restaurantAccessTokens";
import { useSnackbar } from "notistack";
import React from "react";
import { confirmContext } from "../../../../contexts/confirmContext";
import TimeProfile from "../timeProfile/timeProfile";
import { useState, useEffect } from "react";
import { getRestaurant } from "../../services/restaurants";
import {useTranslation} from "react-i18next";

export const ZoneTimeProfile = ({ restaurantId }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [profiles, setProfiles] = useState({
        'alarm_minutes': 20, //TODO ASK
        'warning_minutes': 15
    });
    const { t, i18n } = useTranslation();

    useEffect(() => {
        getRestaurant(restaurantId)
        .then(restaurant => setProfiles({
            'alarm_minutes': restaurant.alarm_minutes,
            'warning_minutes': restaurant.warning_minutes
        }))
        .catch(() => enqueueSnackbar(t("unableGetRest"), {variant: 'error'}));
    }, [restaurantId]);


    return <Zone title="time profile">
        <div className='grid grid-cols-1 divide-y divide-gray-500 dark:divide-gray-100'>
        <TimeProfile 
            onPatch={(minutes) => setProfiles({...profiles, 'alarm_minutes': minutes})}
            restaurantId={restaurantId}
            profileValue={profiles.alarm_minutes} 
            profileName={'alarm_minutes'}
            prefix={'alarm'}
        />

        <TimeProfile 
            onPatch={(minutes) => setProfiles({...profiles, 'warning_minutes': minutes})}
            restaurantId={restaurantId}
            profileValue={profiles.warning_minutes} 
            profileName={'warning_minutes'}
            prefix={'warning'}
            />
        </div>
    </Zone>
}