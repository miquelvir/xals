import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import NoButton from '../../../../components/buttons/noButton/noButton';
import React, { useState } from 'react';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Button from '../../../../components/buttons/button/button';
import { questionContext } from '../../../../contexts/questionContext';

export default function NewTableMenu({
  handleHide = () => { },
  handleShow = () => { },
  addNewTable = (_) => { },
  existingTableNumbers = [],
  ...props
}) {
  const defaultTables = ['15', '0', '12', '111', '1213', '2', '5', '9']; // TODO API

  const handleNewTable = (tableNumber) => {
    // TODO API
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        addNewTable({
          number: tableNumber,
          lastCourseDatetime: new Date(),
          nextCourse: 'first',
          status: 'ok'
        });
        handleHide();
        setLoading(false);
        resolve();
      }, 5000);
    });
  }

  const [loading, setLoading] = useState(false);

  const prompt = React.useContext(questionContext);
  const handleAskCustomInput = () => {
    handleHide();
    prompt.prompt({
      title: "table #",
      handleSubmit: (result) => new Promise(function (resolve, reject) {
        // the function is executed automatically when the promise is constructed
        // after 1 second signal that the job is done with the result "done"
        setTimeout(handleNewTable(result).then(() => resolve(), () => reject()), 3000);
      }),
      handleCancel: handleShow
    });
  }

  const handleNewDefaultTable = (number) => {
    setLoading(number);
    handleNewTable(number);
  }

  return <React.Fragment>
    <TextActionsModal
      handleHide={handleHide}
      title="new table2"
      description="start timer for a new table"
      disabled={loading !== false}
      actions={<React.Fragment>
        <NoButton onClick={handleHide} text="cancel" disabled={loading!==false} />
        <YesButton onClick={handleAskCustomInput} text="custom" disabled={loading!==false} />
      </React.Fragment>}
      {...props}>

      <div className='p-1 pt-4'>
        {defaultTables.filter(table => !existingTableNumbers.includes(table)).map(tableName => 
        <Button loading={loading===tableName} disabled={loading!==false} onClick={() => handleNewDefaultTable(tableName)} text={tableName} key={tableName} />)}
      </div>
    </TextActionsModal>
  </React.Fragment>;
}