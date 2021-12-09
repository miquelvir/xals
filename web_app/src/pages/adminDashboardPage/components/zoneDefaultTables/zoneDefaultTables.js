import React, { useEffect } from "react";
import { confirmContext } from "../../../../contexts/confirmContext";
import { questionContext } from "../../../../contexts/questionContext";
import Zone from "../zone/zone";
import Button from "../../../../components/buttons/button/button";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { useSnackbar } from 'notistack';
import { getRestaurantDefaultTables, postRestaurantDefaultTables, deleteRestaurantDefaultTables } from "../../services/defaultTables";
import { useCollectionState } from "../../../../hooks/useCollectionState/useCollectionState";
import { useState } from "react";
import {useTranslation} from "react-i18next";

export const ZoneDefaultTables = ({ restaurantId }) => {
    const [tables, setTables, tableUtils] = useCollectionState('name');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        getRestaurantDefaultTables(restaurantId)
        .then((tables) => setTables(tables))
        .catch(_ => enqueueSnackbar(t("unableGetTables"), { variant: 'error' }))
    }, [restaurantId]);


    const confirm = React.useContext(confirmContext);
    const prompt = React.useContext(questionContext);
    const { t, i18n } = useTranslation();
    const handleDeleteDefaultTable = (name) => {
      confirm({
        title: `${t("deleteTableQuestion")} ${name}?`,
        description: `${t("Deleting Table")} ${name} ${t("onlyDeleteFromList")}`,
        handleSuccess: () => {
          setLoading(name);
            deleteRestaurantDefaultTables(restaurantId, name).then(() => {
                tableUtils.remove(name);
                enqueueSnackbar(t("deletedTable"), { variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t("unableDelTable"), { variant: 'error' });
            }).finally(() => setLoading(null));
            
        }
      })
    };

    const handleAddNewDefaultTable = () => {
  
      prompt.prompt({
        title: t("table #"),
        description: t("nameTableQuestion"),
        handleSubmit: (name) => {
            return new Promise(function (resolve, reject) {
                postRestaurantDefaultTables(restaurantId, name).then((table) => {
                    tableUtils.add(table);
                    enqueueSnackbar(t("addedTable"), { variant: 'success' });
                    resolve();
                }).catch(() => {
                    enqueueSnackbar(t("unableAddTable"), { variant: 'error' });
                    reject();
                })
                })
        }
      })
    }
  
    return <Zone title={t("default tables")}>
      {tables.map(table => <Button onClick={() => handleDeleteDefaultTable(table.name)} text={table.name} key={table.name} loading={loading===table.name} />)}
  
      <YesButton onClick={handleAddNewDefaultTable} text={t("AddNewFem")} />
    </Zone>;
  }
  