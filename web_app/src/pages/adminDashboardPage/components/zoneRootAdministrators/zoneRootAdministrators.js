import {useSnackbar} from 'notistack';
import { useCollectionState } from '../../../../hooks/useCollectionState/useCollectionState';
import React from 'react';
import { questionContext } from '../../../../contexts/questionContext';
import { useEffect } from 'react';
import Zone from '../zone/zone';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Admin from '../admin/admin';
import { getSuperAdministrators, postSuperAdministrator, deleteSuperAdministrator } from '../../services/superAdministrators';
import { useTranslation } from 'react-i18next';

export const ZoneRootAdministrators = ({ privacyFilter }) => {
  const [administrators, setAdministrators, administratorUtils] = useCollectionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const question = React.useContext(questionContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getSuperAdministrators()
      .then((administators) => setAdministrators(administators))
      .catch(_ => enqueueSnackbar(t("errorAdminRetrieval"), { variant: 'error' }))
  }, []);

  const handleNewAdministrator = () => {
    question.prompt({
      title: t("administratorEmail"), description: t("descriptionAddAdmin"),
      handleSubmit: (email) => {
        return new Promise(function (resolve, reject) {
          postSuperAdministrator(email).then((administrator) => {
            administratorUtils.add(administrator);
            enqueueSnackbar(t("addAdmin"), { variant: 'success' });
            resolve();
          }).catch(() => {
            enqueueSnackbar(t("errorAddAdmin"), { variant: 'error' });
            reject();
          })
        })
      }, handleCancel: () => enqueueSnackbar(t("cancelled"), { variant: 'warning' })
    })
  };

  return <Zone title={t("root administrators")}>
    <div className='grid grid-cols-1 divide-y divide-gray-500'>
      {administrators.map(administrator => (
        <Admin key={administrator.id} admin={administrator} privacyFilter={privacyFilter} 
        deleteAdministrator={administratorUtils.remove}
        deleteAdministratorService={deleteSuperAdministrator}
        />
      ))}
    </div>
    <div className='grid justify-items-center  pt-8'>
      <YesButton onClick={handleNewAdministrator} text={"ADD NEW"} w='w-64'/>
    </div>

  </Zone>
}
//todo: ask add new