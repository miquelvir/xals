import { palette } from '../../palette';
import Modal from '../modal/modal';
import Button from '../buttons/button/button';
import NoButton from '../buttons/noButton/noButton';
import TextActionsModal from '../textActionsModal/textActionsModal';
import React from 'react';
import {useTranslation} from "react-i18next";

function ConfirmModal({
    title="askContinue",
    description="difficultUndone",
    cancel="cancel",
    confirm="confirm",
    handleSuccess= () => {},
    handleCancel= () => {},
   ...props
}) {
    const { t, i18n } = useTranslation();
   return <TextActionsModal 
    handleHide={handleCancel}
    title={t(title)}
    description={t(description)}
    icon={<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>}
    actions={
      <React.Fragment>
        <NoButton text={t(cancel)} onClick={handleCancel}/>
        <Button text={t(confirm)} onClick={handleSuccess}/>
      </React.Fragment>
    }
   />;
}

export default ConfirmModal;