import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { themeContext, THEME_DARK } from '../../../../contexts/themeContext';

export const ZoneHistoric = ({restaurantId}) => {
    const { t } = useTranslation();
    const themeCtx = React.useContext(themeContext);

    const data = {
      "average": {
        "2022-01-20": 3.04999356667, 
        "2022-01-21": 5.049993566666667, 
        "2022-01-22": 4.0499935666667, 
        "2022-01-23": 5.0499935666, 
        "2022-01-24": 6.0499935667, 
        "2022-01-25": 7.04999367, 
        "2022-01-26": 8.0499666667, 
        "2022-01-27": 7.04966667, 
        "2022-01-28": 8.0496666667, 
        "2022-01-29": 9.04
      }
    }; // todo
    const preparedData = Object.entries(data["average"]).map(d => ({
        "date": d[0],
        "averageWaitingTime": d[1] / 60  // to minutes
      }));
      const fgColor = themeCtx.theme === THEME_DARK? '#ffffff': '#000000';

    return <Zone title={t("historic-average-waiting-time")}>
      <LineChart width={730} height={250} data={preparedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <XAxis dataKey="date" stroke={fgColor}/>
        <YAxis dataKey="averageWaitingTime"  stroke={fgColor} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageWaitingTime" stroke={fgColor}/>
      </LineChart>
    </Zone>;
  }
  