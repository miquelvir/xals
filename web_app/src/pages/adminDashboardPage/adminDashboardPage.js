import ThemeButton from '../../components/themeButton/themeButton';
import LanguageButton from '../../components/languageButton/languageButton';
import { palette } from '../../palette';
import { useState } from 'react';
import Button from '../../components/buttons/button/button';
import { confirmContext } from '../../contexts/confirmContext';
import { questionContext } from '../../contexts/questionContext';
import React from 'react';
import Zone from './components/zone/zone';

function AdminDashboardPage() {
  const confirm = React.useContext(confirmContext);
  const prompt = React.useContext(questionContext);

  const [defaultTables, setDefaultTables] = useState([12, 14, 15, 2, 18, 21]);  // TODO API
  const handleDeleteDefaultTable = (name) => {
    // TODO API
    confirm({ handleSuccess: () => setDefaultTables(defaultTables.filter(x => x !== name)) })
  };
  const handleAddNewDefaultTable = () => {
    
    prompt.prompt({
      title: 'table #',
      description: 'what is the name of the new table you want to add?',
      handleSubmit: (table) => {
        if (defaultTables.includes(table)) return;
        setDefaultTables([...defaultTables, table]);
          // TODO API
      }
    })
  }

  return <div>
    <div className='p-2 pl-8 pr-8'>
      <div className='inline-block'><p class={`font-mono text-4xl ${palette.text}`}>
        Restaurante 21
      </p></div>
      <div className='float-right'>
        <ThemeButton />
        <LanguageButton /></div>

    </div>

    <Zone title="default tables"> 
      {defaultTables.map(name => <Button onClick={() => handleDeleteDefaultTable(name)} text={name} key={name} />)}

        <Button onClick={handleAddNewDefaultTable} text={"ADD NEW"} />
    </Zone>

    <Zone title="access URLs"> 
    
    </Zone>
    

  </div>
}

export default AdminDashboardPage;

