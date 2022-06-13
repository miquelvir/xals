import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { themeContext, THEME_DARK } from '../../../../contexts/themeContext';
import {getHistoricStatsPerCourse} from "../../services/statistics";


export const ZonePerCourse = ({ restaurantId, preparedData }) => {
    const { t } = useTranslation();
    const themeCtx = React.useContext(themeContext);
    const fgColor = themeCtx.theme === THEME_DARK? '#ffffff': '#000000';

    return <Zone title={t("average-waiting-time-per-course")}>
          <BarChart width={730} height={250} data={preparedData}>
      <XAxis dataKey="course" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="waiting time (minutes)" fill={fgColor} />
    </BarChart>
    </Zone>;
  }
  