import Zone from "../zone/zone";
import AccessUrl from "../accessUrl/accessUrl";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { postRestaurantAccessToken, deleteRestaurantAccessToken, patchRestaurantAccessToken, getRestaurantAccessTokens } from "../../services/restaurantAccessTokens";
import { useSnackbar } from "notistack";
import { useCollectionState } from "../../../../hooks/useCollectionState/useCollectionState";
import React from "react";
import { confirmContext } from "../../../../contexts/confirmContext";
import { questionContext } from "../../../../contexts/questionContext";
import { useEffect } from "react";
import {useTranslation} from "react-i18next";

export const ZoneAccessTokens = ({ restaurantId, privacyFilter }) => {
    const [tokens, setTokens, tokenUtils] = useCollectionState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = React.useContext(confirmContext);
    const prompt = React.useContext(questionContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        getRestaurantAccessTokens(restaurantId)
        .then((tokens) => setTokens(tokens))
        .catch(_ => enqueueSnackbar(t("unableGetTokens"), { variant: 'error' }))
    }, [restaurantId]);

    const handleDeleteAccessToken = (id) => {
      confirm({
        title: t("delTokenQuest"),
        description: t("delTokenDescription"),
        handleSuccess: () => {
            deleteRestaurantAccessToken(restaurantId, id).then(() => {
                tokenUtils.remove(id);
                enqueueSnackbar(t("delToken"), { variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t("unableDelToken"), { variant: 'error' });
            });
        }
      })
    };

    const handleNewAccessToken = () => {
      prompt.prompt({
        title: t("description"),
        description: t("descriptionUsesToken"),
        handleSubmit: (name) => {
            return new Promise(function (resolve, reject) {
                postRestaurantAccessToken(restaurantId, name).then((table) => {
                    tokenUtils.add(table);
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

    const handleOnAccessTokenPatch = (id, token) => {
        tokenUtils.patch(id, token);
    }

    return <Zone title="access URLs">
        <div className='grid grid-cols-1 divide-y divide-gray-500 dark:divide-gray-100'>
            {tokens.map(token => <AccessUrl 
            key={token.id}
            onPatch={handleOnAccessTokenPatch}
            restaurantId={restaurantId}
            privacyFilter={privacyFilter} 
            onDelete={() => handleDeleteAccessToken(token.id)} 
            token={token} />)}
        </div>

        <div className='grid justify-items-center  pt-8'>
            <YesButton onClick={handleNewAccessToken} text={t("new")} w='w-64' />
        </div>
    </Zone>
}