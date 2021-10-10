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
import SignOutButton from './components/signOutButton/signOutButton';
import { userContext } from '../../contexts/userContext';
import AdminDashboardPageRestaurant from './adminDashboardPageRestaurant';
import AdminDashboardPageSuper from './adminDashboardPageSuper';

function AdminDashboardPage() {
  const userCtx = React.useContext(userContext);

  const [privacyFilter, setPrivacyFilter] = useState(true);

  return <div>
    <div className='p-2 pl-8 pr-8'>
      <div className='inline-block'><p className={`font-mono text-4xl ${palette.text}`}>
        {userCtx.isSuperAdminLoggedIn? 'root admin': userCtx.params['restaurantName'] ?? '...'}
      </p></div>
      <div className='float-right'>
        <ThemeButton />
        <LanguageButton />
        <PrivacyButton privacyFilter={privacyFilter} setPrivacyFilter={setPrivacyFilter} />
        <SignOutButton />
      </div>

    </div>

    <div className='inline-block w-full'>
    {
      userCtx.isRestaurantAdminLoggedIn && <AdminDashboardPageRestaurant privacyFilter={privacyFilter}/>
    }
    {
      userCtx.isSuperAdminLoggedIn && <AdminDashboardPageSuper privacyFilter={privacyFilter}/>
    }
    </div>

    
    

  </div>
}

export default AdminDashboardPage;

