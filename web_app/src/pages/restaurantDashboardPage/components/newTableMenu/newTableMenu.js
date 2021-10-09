import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import ConfirmModal from '../../../../components/confirmModal/confirmModal';
import NoButton from '../../../../components/buttons/noButton/noButton';
import React from 'react';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Button from '../../../../components/buttons/button/button';

export default function NewTableMenu({
  handleHide = () => { },
  handleShow = () => { },
  addNewTable = (_) => {},
  existingTableNumbers = [],
  ...props
}) {
  const defaultTables = ['15', '0', '12', '111', '1213', '2', '5', '9']; // TODO API

  const handleNewTable = (tableNumber) => {
    // TODO API
    addNewTable({ 
      number: tableNumber, 
      lastCourseDatetime: new Date(), 
      nextCourse: 'first', 
      status: 'ok' });
    handleHide();
  }

  return <React.Fragment>
    <ConfirmModal />
    <TextActionsModal
      handleHide={handleHide}
      title="new table"
      description="start timer for a new table"
      actions={<React.Fragment>
        <NoButton onClick={handleHide} text="cancel" />
        <YesButton onClick={() => {}} text="custom" />
      </React.Fragment>}
      {...props}>

      <div className='p-1 pt-4'>
        {defaultTables.filter(table => !existingTableNumbers.includes(table)).map(tableName => <Button onClick={() => handleNewTable(tableName)} text={tableName} key={tableName}/>)}
      </div>
    </TextActionsModal>
  </React.Fragment>;
}
