import { useLocation } from "react-router-dom";

/**
 * useAccessToken returns the restaurantId and accessToken found in the url 
 * 
 * @returns a list [restaurantId, accessToken]
 */
export const useAccessToken = () => {
    const search = useLocation().search;

    const restaurantId = new URLSearchParams(search).get("id");
    const accessToken = new URLSearchParams(search).get("token");

    return [restaurantId, accessToken];
};