import ThemeButton from '../../components/themeButton/themeButton';
import LanguageButton from '../../components/languageButton/languageButton';
import { palette } from '../../palette';
import { useState } from 'react';
import Button from '../../components/buttons/button/button';
import { confirmContext } from '../../contexts/confirmContext';
import { questionContext } from '../../contexts/questionContext';
import React from 'react';
import Zone from './components/zone/zone';
import AccessUrl from './components/accessUrl/accessUrl';
import PrivacyButton from './components/privacyButton/privacyButton';
import YesButton from '../../components/buttons/yesButton/yesButton';
function AdminDashboardPage() {
  const confirm = React.useContext(confirmContext);
  const prompt = React.useContext(questionContext);

  const [defaultTables, setDefaultTables] = useState([12, 14, 15, 2, 18, 21]);  // TODO API
  const handleDeleteDefaultTable = (name) => {
    // TODO API
    confirm({ title: `Do you want to delete Table ${name}?`, 
    description: `Deleting Table ${name} will only remove it from the default tables list.`,
    handleSuccess: () => setDefaultTables(defaultTables.filter(x => x !== name)) })
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

  
  const [privacyFilter, setPrivacyFilter] = useState(true);

  return <div>
    <div className='p-2 pl-8 pr-8'>
      <div className='inline-block'><p class={`font-mono text-4xl ${palette.text}`}>
        Restaurante 21
      </p></div>
      <div className='float-right'>
        <ThemeButton />
        <LanguageButton />
        <PrivacyButton privacyFilter={privacyFilter} setPrivacyFilter={setPrivacyFilter} />
      
      </div>

    </div>

    <Zone title="default tables"> 
      {defaultTables.map(name => <Button onClick={() => handleDeleteDefaultTable(name)} text={name} key={name} />)}

        <YesButton onClick={handleAddNewDefaultTable} text={"ADD NEW"} />
    </Zone>

    <Zone title="access URLs"> 
      <div class='grid grid-cols-1 divide-y divide-gray-500 dark:divide-gray-100'>
        <AccessUrl privacyFilter={privacyFilter} accessUrl={
          { url: 'https://xals.herokuapp.com/app/restaurant?id=XYZ&token=ZYX', comment: 'cocina y cambrerxs' }
        }/>
        <AccessUrl privacyFilter={privacyFilter} accessUrl={
          { url: 'https://xals.herokuapp.com/app/restaurant?id=XYZ2&token=ZYX2', comment: 'recepción' }
        }/>
        </div>
    </Zone>
    

  </div>
}

export default AdminDashboardPage;

