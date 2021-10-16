import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import NoButton from '../../../../components/buttons/noButton/noButton';
import React, { useState } from 'react';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Button from '../../../../components/buttons/button/button';
import { questionContext } from '../../../../contexts/questionContext';
import { userContext } from '../../../../contexts/userContext';

export default function NewTableMenu({
  handleHide = () => { },
  handleShow = () => { },
  addNewTable = (_) => { },
  existingTableNumbers = [],
  ...props
}) {
  const userCtx = React.useContext(userContext);
  const defaultTables = (userCtx.params['defaultTables'] ?? []).map(table => table.name);

  const handleNewTable = (tableNumber) => {
    return new Promise(function (resolve, reject) {
      addNewTable(tableNumber);
      handleHide();
      setLoading(false);
      resolve();
    });
  }

  const [loading, setLoading] = useState(false);

  const prompt = React.useContext(questionContext);
  const handleAskCustomInput = () => {
    handleHide();
    prompt.prompt({
      title: "table #",
      handleSubmit: (result) => new Promise(function (resolve, reject) {
        handleNewTable(result).then(() => resolve(), () => reject())
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
