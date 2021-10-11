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

export const ZoneAccessTokens = ({ restaurantId, privacyFilter }) => {
    const [tokens, setTokens, tokenUtils] = useCollectionState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = React.useContext(confirmContext);
    const prompt = React.useContext(questionContext);

    useEffect(() => {
        getRestaurantAccessTokens(restaurantId)
        .then((tokens) => setTokens(tokens))
        .catch(_ => enqueueSnackbar("unable to retrieve access tokens", { variant: 'error' }))
    }, [restaurantId]);

    const handleDeleteAccessToken = (id) => {
      confirm({
        title: `Do you want to delete the access token?`,
        description: `Deleting the access token will render that url invalid (even for people who already had it).`,
        handleSuccess: () => {
            deleteRestaurantAccessToken(restaurantId, id).then(() => {
                tokenUtils.remove(id);
                enqueueSnackbar("deleted access token", { variant: 'success' });
            }).catch(() => {
                enqueueSnackbar("unable to delete access token", { variant: 'error' });
            });
        }
      })
    };

    const handleNewAccessToken = () => {
      prompt.prompt({
        title: 'description',
        description: 'write a small description of the uses of this url (good examples would include who will this access url be given to, or which team will have access to it)',
        handleSubmit: (name) => {
            return new Promise(function (resolve, reject) {
                postRestaurantAccessToken(restaurantId, name).then((table) => {
                    tokenUtils.add(table);
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
            <YesButton onClick={handleNewAccessToken} text="new" w='w-64' />
        </div>
    </Zone>
}