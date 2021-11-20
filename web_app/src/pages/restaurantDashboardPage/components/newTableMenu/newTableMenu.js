import TextActionsModal from '../../../../components/textActionsModal/textActionsModal';
import NoButton from '../../../../components/buttons/noButton/noButton';
import React, { useEffect, useState } from 'react';
import YesButton from '../../../../components/buttons/yesButton/yesButton';
import Button from '../../../../components/buttons/button/button';
import { questionContext } from '../../../../contexts/questionContext';
import { userContext } from '../../../../contexts/userContext';
import { useTranslation } from 'react-i18next';

const tryParseInt = (x) => parseInt(x) ?? x;

export default function NewTableMenu({
  handleHide = () => { },
  handleShow = () => { },
  addNewTable = (_) => { },
  existingTableNumbers = [],
  ...props
}) {
  const userCtx = React.useContext(userContext);
  const { t, i18n } = useTranslation();

    const [defaultTables, setDefaultTables] = useState([]);
    useEffect(() => {
      setDefaultTables((userCtx.params['defaultTables'] ?? [])
      .map(table => table.name)
      .sort((a, b) => tryParseInt(a) - tryParseInt(b)));
    }, [userCtx.params['defaultTables']]);
    
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
      title: "table #", //todo: this one?
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
      title={t("new table2")}
      description={t("startTimerTable")}
      disabled={loading !== false}
      actions={<React.Fragment>
        <NoButton onClick={handleHide} text={t("cancel")} disabled={loading!==false} />
        <YesButton onClick={handleAskCustomInput} text={t("custom")} disabled={loading!==false} />
      </React.Fragment>}
      {...props}>

      <div className='p-1 pt-4'>
        {defaultTables.filter(table => !existingTableNumbers.includes(table)).map(tableName => 
        <Button loading={loading===tableName} disabled={loading!==false} onClick={() => handleNewDefaultTable(tableName)} text={tableName} key={tableName} />)}
      </div>
    </TextActionsModal>
  </React.Fragment>;
}
