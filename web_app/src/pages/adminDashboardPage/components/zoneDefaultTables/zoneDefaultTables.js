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

export const ZoneDefaultTables = ({ restaurantId }) => {
    const [tables, setTables, tableUtils] = useCollectionState('name');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        getRestaurantDefaultTables(restaurantId)
        .then((tables) => setTables(tables))
        .catch(_ => enqueueSnackbar("unable to retrieve default tables", { variant: 'error' }))
    }, [restaurantId]);


    const confirm = React.useContext(confirmContext);
    const prompt = React.useContext(questionContext);
  
    const handleDeleteDefaultTable = (name) => {
      // TODO API
      confirm({
        title: `Do you want to delete Table ${name}?`,
        description: `Deleting Table ${name} will only remove it from the default tables list.`,
        handleSuccess: () => {
          setLoading(name);
            deleteRestaurantDefaultTables(restaurantId, name).then(() => {
                tableUtils.remove(name);
                enqueueSnackbar("deleted default table", { variant: 'success' });
            }).catch(() => {
                enqueueSnackbar("unable to delete default table", { variant: 'error' });
            }).finally(() => setLoading(null));
            
        }
      })
    };

    const handleAddNewDefaultTable = () => {
  
      prompt.prompt({
        title: 'table #',
        description: 'what is the name of the new table you want to add?',
        handleSubmit: (name) => {
            return new Promise(function (resolve, reject) {
                postRestaurantDefaultTables(restaurantId, name).then((table) => {
                    tableUtils.add(table);
                    enqueueSnackbar("added new default table", { variant: 'success' });
                    resolve();
                }).catch(() => {
                    enqueueSnackbar("unable to add new default table", { variant: 'error' });
                    reject();
                })
                })
        }
      })
    }
  
    return <Zone title="default tables">
      {tables.map(table => <Button onClick={() => handleDeleteDefaultTable(table.name)} text={table.name} key={table.name} loading={loading===table.name} />)}
  
      <YesButton onClick={handleAddNewDefaultTable} text={"ADD NEW"} />
    </Zone>;
  }
  