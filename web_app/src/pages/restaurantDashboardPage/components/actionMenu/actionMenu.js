import ConfirmModal from '../../../../components/confirmModal/confirmModal';
import {twoPadding} from '../../../../helpers/numberPadding';
import React from 'react';
import { confirmContext } from '../../../../contexts/confirmContext';
import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import Button from '../../../../components/buttons/button/button';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import NoButton from '../../../../components/buttons/noButton/noButton';
import { realtimeServiceContext } from '../../contexts/realtimeService/realtimeServiceContext';
import { useTranslation } from 'react-i18next';

function ActionMenu({
    table,
    handleHide=()=>{},
    handleShow=()=>{},
   ...props
}) {
    const confirm = React.useContext(confirmContext);
    const realtimeCtx = React.useContext(realtimeServiceContext);
    const { t, i18n } = useTranslation();

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

    const handleDelete = () => {
        handleHide();
        confirm({
            handleSuccess: () => {
                realtimeCtx.deleteTable(table.id);
            },
            handleCancel: () => {
                handleShow();
            }})
    };

    const isLastCourse = table.next_course === 'desserts';

    const handleNext = (desserts = false) => {
        handleHide();

        if (!isLastCourse) {
            realtimeCtx.nextCourse(table.id, desserts);
            return;
        }
        
        confirm({
            title: t('serve desserts and finalize table?'), //TODO ASK
            handleSuccess: () => {
                realtimeCtx.finishTable(table.id);
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
            title={`${t("table")} ${table.number}`}
            description={`${t("timeLastCourse")} ${twoPadding(lastCourse.hour)}:${twoPadding(lastCourse.minute)}`}
            actions={<React.Fragment>
                    <NoButton onClick={handleHide} text={t("cancel")} />
                    { !isLastCourse && <YesButton onClick={() => handleNext(true)} text={t("desserts")} /> }
                    <YesButton onClick={() => handleNext(false)} text={isLastCourse? t("finalize"): t("next")} />
                    <Button onClick={handleDelete} text={t("delete")} />
            </React.Fragment>}
      {...props} />
    </React.Fragment>;
}

export default ActionMenu;