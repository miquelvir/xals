import React from "react";
import Zone from "../zone/zone";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import {useTranslation} from "react-i18next";

export const ZoneShortcuts = ({setView}) => {
    const { t } = useTranslation();
  
    return <Zone title={t("shortcuts")}>
      <YesButton onClick={() => setView('stats')} text={t("statistics")} />
    </Zone>;
  }
  