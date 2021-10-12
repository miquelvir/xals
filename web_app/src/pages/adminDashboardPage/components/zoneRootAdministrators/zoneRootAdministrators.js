import {useSnackbar} from 'notistack';
import { useCollectionState } from '../../../../hooks/useCollectionState/useCollectionState';
import React from 'react';
import { questionContext } from '../../../../contexts/questionContext';
import { useEffect } from 'react';
import Zone from '../zone/zone';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Admin from '../admin/admin';
import { getSuperAdministrators, postSuperAdministrator, deleteSuperAdministrator } from '../../services/superAdministrators';

export const ZoneRootAdministrators = ({ privacyFilter }) => {
  const [administrators, setAdministrators, administratorUtils] = useCollectionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const question = React.useContext(questionContext);

  useEffect(() => {
    getSuperAdministrators()
      .then((administators) => setAdministrators(administators))
      .catch(_ => enqueueSnackbar("unable to retrieve root administrators", { variant: 'error' }))
  }, []);

  const handleNewAdministrator = () => {
    question.prompt({
      title: "administrator email", description: "this will add a new root administrator to the system; root administrators have complete access to all restaurants and users (including other administrators)",
      handleSubmit: (email) => {
        return new Promise(function (resolve, reject) {
          postSuperAdministrator(email).then((administrator) => {
            administratorUtils.add(administrator);
            enqueueSnackbar("added new root administrator", { variant: 'success' });
            resolve();
          }).catch(() => {
            enqueueSnackbar("unable to add new root administrator", { variant: 'error' });
            reject();
          })
        })
      }, handleCancel: () => enqueueSnackbar("cancelled", { variant: 'warning' })
    })
  };

  return <Zone title="root administrators">
    <div className='grid grid-cols-1 divide-y divide-gray-500'>
      {administrators.map(administrator => (
        <Admin key={administrator.id} admin={administrator} privacyFilter={privacyFilter} 
        deleteAdministrator={administratorUtils.remove}
        deleteAdministratorService={deleteSuperAdministrator}
        />
      ))}
    </div>
    <div className='grid justify-items-center  pt-8'>
      <YesButton onClick={handleNewAdministrator} text={"ADD NEW"} w='w-64' />
    </div>

  </Zone>
}