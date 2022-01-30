import ThemeButton from '../../components/themeButton/themeButton';
import LanguageButton from '../../components/languageButton/languageButton';
import { palette } from '../../palette';
import { useEffect, useState } from 'react';
import React from 'react';
import PrivacyButton from './components/privacyButton/privacyButton';
import SignOutButton from './components/signOutButton/signOutButton';
import { userContext } from '../../contexts/userContext';
import AdminDashboardPageRestaurant from './adminDashboardPageRestaurant';
import AdminDashboardPageSuper from './adminDashboardPageSuper';
import BackToRootButton from './components/backToRootButton/backToRootButton';


function AdminDashboardPage() {
  const userCtx = React.useContext(userContext);

  const [privacyFilter, setPrivacyFilter] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (userCtx.params.restaurantId === null) {
      setRestaurant(null);
      return;
    }
    setRestaurant({
      id: userCtx.params.restaurantId,
      name: userCtx.params.restaurantName
    })
  }, [userCtx.params])

  return <div>
    <div className='p-2 pl-8 pr-8'>
      <div className='inline-block'>
        <p className={`font-mono text-4xl ${palette.text}`}>
          {userCtx.isSuperAdminLoggedIn && restaurant === null ? 'root admin' : restaurant.name ?? '...'}
        </p>
      </div>
      <div className='float-right'>
        {(userCtx.isSuperAdminLoggedIn && restaurant !== null) && <BackToRootButton handleClick={() => setRestaurant(null)} />}
        <ThemeButton />
        <LanguageButton />
        <PrivacyButton privacyFilter={privacyFilter} setPrivacyFilter={setPrivacyFilter} />
        <SignOutButton />
      </div>
    </div>

    <div className='inline-block w-full'>
      { (userCtx.isRestaurantAdminLoggedIn || restaurant !== null) 
          ? <AdminDashboardPageRestaurant privacyFilter={privacyFilter} restaurant={restaurant} />
          : <AdminDashboardPageSuper privacyFilter={privacyFilter} setRestaurant={setRestaurant} />}
    </div>
  </div>
}

export default AdminDashboardPage;

