import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { themeContext, THEME_DARK } from '../../../../contexts/themeContext';

export const ZoneHistoric = ({ preparedData }) => {
    const { t } = useTranslation();
    const themeCtx = React.useContext(themeContext);

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
  