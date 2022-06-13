import { get } from '../../../services/crudApi';

const getHistoricStatsPerCourseEndpoint = (restaurantId, startTime, endTime, startDate, endDate) => `/statistics/waitingTime/courses?startTime=${startTime}&endTime=${endTime}&startDate=${startDate}&endDate=${endDate}&restaurantId=${restaurantId}`;

export const getHistoricStatsPerCourse = (restaurantId, startTime, endTime, startDate, endDate) => {
    return get(
        getHistoricStatsPerCourseEndpoint(restaurantId, startTime, endTime, startDate, endDate),
        (data, resolve, _) => resolve(data['average'])
    );
};


const getHistoricStatsEndpoint = (restaurantId, startTime, endTime, startDate, endDate) => `/statistics/waitingTime/historic?startTime=${startTime}&endTime=${endTime}&startDate=${startDate}&endDate=${endDate}&restaurantId=${restaurantId}`;

export const getHistoricStats = (restaurantId, startTime, endTime, startDate, endDate) => {
    return get(
        getHistoricStatsEndpoint(restaurantId, startTime, endTime, startDate, endDate),
        (data, resolve, _) => resolve(data['average'])
    );
};

