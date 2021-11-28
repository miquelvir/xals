import TableCard from './components/tableCard/tableCard';
import NewTableCard from './components/tableCard/newTableCard';
import SortButton, { SORT_PRIORITY, SORT_NUMBER_ASCENDING, SORT_NUMBER_DESCENDING } from './components/sortButton/sortButton';
import { useState, useEffect } from 'react';
import ThemeButton from '../../components/themeButton/themeButton';
import LanguageButton from '../../components/languageButton/languageButton';
import { palette } from '../../palette';
import { RealtimeServiceContextProvider, realtimeServiceContext } from './contexts/realtimeService/realtimeServiceContext';
import React from 'react';
import { userContext } from '../../contexts/userContext';
import AlertsButton, { MENU_HOME } from './components/alertsButton/alertsButton';
import { useQueueState } from '../../hooks/useQueueState/useQueueState';

const tryParseInt = (x) => parseInt(x) ?? x;

const sortProviders = {
  [SORT_PRIORITY]: (table1, table2) => table1.last_course_datetime.toMillis() - table2.last_course_datetime.toMillis(),
  [SORT_NUMBER_ASCENDING]: (table1, table2) => tryParseInt(table1.number) - tryParseInt(table2.number),
  [SORT_NUMBER_DESCENDING]: (table1, table2) => tryParseInt(table2.number) - tryParseInt(table1.number),
}
function _RestaurantDashboardPage() {
  const realtimeCtx = React.useContext(realtimeServiceContext);
  const userCtx = React.useContext(userContext);

  const [notifications, setNotification] = useState([]);
  /* const onCourseServed = (table) => setNotification([...notifications, table]);

  useEffect(() => {
    realtimeCtx.onCourseServed.suscribe(onCourseServed);
    return () => realtimeCtx.onCourseServed.unsuscribe(onCourseServed);
  });*/

  const [sort, setSort] = useState(SORT_PRIORITY);
  const [menu, setMenu] = useState(MENU_HOME);

  const tables = realtimeCtx.tables;
  const [sortedTables, _setSortedTables] = useState([]);

  const setSortedTables = (newTables) => {
    newTables.sort(sortProviders[sort]);
    _setSortedTables([...newTables]);
  }
  useEffect(() => setSortedTables(tables), [tables, sort]);

  const HomeMenu = () => <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  <NewTableCard addNewTable={realtimeCtx.addTable} existingTableNumbers={tables.map(table => table.number)} />

  {sortedTables.map(table =>
    <TableCard table={table} key={table.id} />)}
</div>;

const AlertsMenu = () => <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
 {notifications.map(x => x.toString())}
</div>;

  return <div>
    <div className='p-2 pt-4 pl-8 pr-8 inline-block w-full'>
      <div className='inline-block'><p className={`font-mono select-none text-4xl ${palette.text}`}>
       {userCtx.params.restaurantName ?? "..."}
      </p></div>
      <div className='float-right'>
        <SortButton sort={sort} setSort={setSort} />
        <AlertsButton menu={menu} setMenu={setMenu} />
        <ThemeButton />
        <LanguageButton /></div>

    </div>

    <div className="p-4">
      {menu == MENU_HOME? <HomeMenu />: <AlertsMenu />}
    </div>
  </div>;
}

function RestaurantDashboardPage() {

  return <RealtimeServiceContextProvider>
    <_RestaurantDashboardPage />
    </RealtimeServiceContextProvider>;
}

export default RestaurantDashboardPage;