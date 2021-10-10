import React from 'react';
import Zone from './components/zone/zone';
import YesButton from '../../components/buttons/yesButton/yesButton';

function AdminDashboardPageSuper({privacyFilter}) {
  return <React.Fragment>
    <Zone title="restaurants">
    <div className='grid justify-items-center'>
    <YesButton onClick={() => {}} text={"ADD NEW"} />
      </div>

  </Zone>

  <Zone title="users">
  <div className='grid justify-items-center'>
    <YesButton onClick={() => {}} text={"ADD NEW"} />
      </div>

  </Zone>
  </React.Fragment>
}

export default AdminDashboardPageSuper;

