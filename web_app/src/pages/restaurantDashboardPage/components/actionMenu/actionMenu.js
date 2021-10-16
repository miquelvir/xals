import ConfirmModal from '../../../../components/confirmModal/confirmModal';
import {twoPadding} from '../../../../helpers/numberPadding';
import React from 'react';
import { confirmContext } from '../../../../contexts/confirmContext';
import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import Button from '../../../../components/buttons/button/button';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import NoButton from '../../../../components/buttons/noButton/noButton';
import { realtimeServiceContext } from '../../contexts/realtimeService/realtimeServiceContext';

function ActionMenu({
    table,
    handleHide=()=>{},
    handleShow=()=>{},
   ...props
}) {
    const confirm = React.useContext(confirmContext);
    const realtimeCtx = React.useContext(realtimeServiceContext);

    const handleFinish = () => {
        handleHide();
        confirm({
            handleSuccess: () => {
                realtimeCtx.finishTable(table.id);
            },
            handleCancel: () => {
                handleShow();
            }})
    };

    const handleNext = () => {
        handleHide();
        confirm({
            handleSuccess: () => {
                realtimeCtx.nextCourse(table.id);
            },
            handleCancel: () => {
                handleShow();
            }})
       
    }
    const lastCourse = table.last_course_datetime.toLocal();

   return <React.Fragment>
       <ConfirmModal />
       <TextActionsModal
      handleHide={handleHide}
      title={`Table ${table.number}`}
      description={`last course was served at ${twoPadding(lastCourse.hour)}:${twoPadding(lastCourse.minute)}`}
      actions={<React.Fragment>
          <NoButton onClick={handleHide} text="cancel" />
            <YesButton onClick={handleNext} text={table.next_course === 'desserts'? "desserts & finalize": "next course"} />
            <Button onClick={handleFinish} text="finish" />
      </React.Fragment>}
      {...props} />
    </React.Fragment>;
}

export default ActionMenu;