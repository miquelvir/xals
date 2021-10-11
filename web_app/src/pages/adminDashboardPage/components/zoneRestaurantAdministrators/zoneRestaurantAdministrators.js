import {useSnackbar} from 'notistack';
import { useCollectionState } from '../../../../hooks/useCollectionState/useCollectionState';
import React from 'react';
import { questionContext } from '../../../../contexts/questionContext';
import { useEffect } from 'react';
import Zone from '../zone/zone';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Admin from '../admin/admin';
import { getRestaurantAdministrators, postRestaurantAdministrator, deleteRestaurantAdministrator } from '../../services/restaurantAdministrators';

export const ZoneRestaurantAdministrators = ({ restaurantId, privacyFilter }) => {
  const [administrators, setAdministrators, administratorUtils] = useCollectionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const question = React.useContext(questionContext);

  useEffect(() => {
    getRestaurantAdministrators(restaurantId)
      .then((administators) => setAdministrators(administators))
      .catch(_ => enqueueSnackbar("unable to retrieve restaurant administrators", { variant: 'error' }))
  }, [restaurantId]);

  const handleNewAdministrator = () => {
    question.prompt({
      title: "administrator email", description: "this will add a new administrator to the system; restaurant administrators can manage the access urls of their restaurants and the default tables",
      handleSubmit: (email) => {
        return new Promise(function (resolve, reject) {
          postRestaurantAdministrator(restaurantId, email).then((administrator) => {
            administratorUtils.add(administrator);
            enqueueSnackbar("added new restaurant administrator", { variant: 'success' });
            resolve();
          }).catch(() => {
            enqueueSnackbar("unable to add new restaurant administrator", { variant: 'error' });
            reject();
          })
        })
      }, handleCancel: () => enqueueSnackbar("cancelled", { variant: 'warning' })
    })
  };

  return <Zone title="restaurant administrators">
    <div className='grid grid-cols-1 divide-y divide-gray-500'>
      {administrators.map(administrator => (
        <Admin key={administrator.id} admin={administrator} privacyFilter={privacyFilter} deleteAdministrator={administratorUtils.remove}
          deleteAdministratorService={(id) => deleteRestaurantAdministrator(restaurantId, id)} />
      ))}
    </div>
    <div className='grid justify-items-center  pt-8'>
      <YesButton onClick={handleNewAdministrator} text={"ADD NEW"} w='w-64' />
    </div>

  </Zone>
}
