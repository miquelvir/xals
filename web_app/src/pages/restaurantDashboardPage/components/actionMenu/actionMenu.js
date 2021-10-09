import ConfirmModal from '../../../../components/confirmModal/confirmModal';
import {twoPadding} from '../../../../helpers/numberPadding';
import React from 'react';
import { confirmContext } from '../../../../contexts/confirmContext';
import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import Button from '../../../../components/buttons/button/button';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import NoButton from '../../../../components/buttons/noButton/noButton';

function ActionMenu({
    table,
    handleHide=()=>{},
    handleShow=()=>{},
   ...props
}) {
    const confirm = React.useContext(confirmContext);

    const handleFinish = () => {
        handleHide();
        confirm({
            handleSuccess: () => {
                
            },
            handleCancel: () => {
                handleShow();
            }})
        // TODO link to backend
    };

   return <React.Fragment>
       <ConfirmModal />
       <TextActionsModal
      handleHide={handleHide}
      title={`Table ${table.number}`}
      description={`last course was served at ${twoPadding(table.lastCourseDatetime.getHours())}:${twoPadding(table.lastCourseDatetime.getMinutes())}`}
      actions={<React.Fragment>
          <NoButton onClick={handleHide} text="cancel" />
            <YesButton onClick={() => {}} text={table.nextCourse} />
            <Button onClick={handleFinish} text="finish" />
      </React.Fragment>}
      {...props} />
    </React.Fragment>;
}

export default ActionMenu;