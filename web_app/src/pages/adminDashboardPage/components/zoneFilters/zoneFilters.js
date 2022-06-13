import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { themeContext, THEME_DARK } from '../../../../contexts/themeContext';

export const ZoneFilters = ({onSearch, startDate, setStartDate, endDate, setEndDate, startTime, setStartTime, endTime, setEndTime  }) => {
    const { t } = useTranslation();
    
    return <Zone>
        <div className="flex items-center pb-2">
            <span className="mx-4 text-gray-500">from</span>
            <div className="relative">

                <input name="start" type="date"
                       value={startDate}
                       onChange={e => setStartDate(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date start"/>
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">

                <input name="end" type="date"
                       value={endDate}
                       onChange={e => setEndDate(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date end"/>
            </div>

        </div>
        <div className="flex items-center pb-2">
            <span className="mx-4 text-gray-500">from</span>
            <div className="relative">

                <input name="start" type="time"
                       value={startTime}
                       onChange={e => setStartTime(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date start"/>
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">

                <input name="end" type="time"
                       value={endTime}
                       onChange={e => setEndTime(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Select date end"/>
            </div>


        </div>
        <div>
            <YesButton onClick={onSearch} text={t("Search")} />
        </div>
    </Zone>;
  }
  