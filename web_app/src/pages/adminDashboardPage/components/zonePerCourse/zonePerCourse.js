import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { themeContext, THEME_DARK } from '../../../../contexts/themeContext';

export const ZonePerCourse = ({restaurantId}) => {
    const { t } = useTranslation();
    const themeCtx = React.useContext(themeContext);

    const data = {
      "average": {
        "1": 4.1027379999999996, 
        "2": 2.3365, 
        "3": 2.891202, 
        "4": 2.539888, 
        "desserts": 3.9026294999999998
      }
    }; // todo
    const preparedData = Object.entries(data["average"]).map(d => ({
        "course": d[0],
        "averageWaitingTime": d[1] / 60  // to minutes
      }));
      const fgColor = themeCtx.theme === THEME_DARK? '#ffffff': '#000000';

    return <Zone title={t("historic-average-waiting-time")}>
          <BarChart width={730} height={250} data={preparedData}>
      <XAxis dataKey="course" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="averageWaitingTime" fill={fgColor} />
    </BarChart>
    </Zone>;
  }
  