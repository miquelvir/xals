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

const sortProviders = {
  [SORT_PRIORITY]: (table1, table2) => table1.last_course_datetime - table2.last_course_datetime,
  [SORT_NUMBER_ASCENDING]: (table1, table2) => table1.number - table2.number,
  [SORT_NUMBER_DESCENDING]: (table1, table2) => table2.number - table1.number,
}
function _RestaurantDashboardPage() {

  const realtimeCtx = React.useContext(realtimeServiceContext);
  const userCtx = React.useContext(userContext);

  var status = ['alarm', 'warning', 'random'];
  status.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const [sort, setSort] = useState(SORT_PRIORITY);

  const tables = realtimeCtx.tables;
  

  const [sortedTables, _setSortedTables] = useState([]);

  console.log(sortedTables, tables);

  const setSortedTables = (newTables) => {
    newTables.sort(sortProviders[sort]);
    _setSortedTables(newTables);
  }
  useEffect(() => setSortedTables(tables), [tables, sort]);

  return <div>
    <div className='p-2 pl-8 pr-8 inline-block w-full'>
      <div className='inline-block'><p className={`font-mono text-4xl ${palette.text}`}>
       {userCtx.params.restaurantName ?? "..."}
      </p></div>
      <div className='float-right'>
        <SortButton sort={sort} setSort={setSort} />
        <ThemeButton />
        <LanguageButton /></div>

    </div>

    <div className="px-4">
      <div className="flex flex-wrap  -mx-4">
        <NewTableCard addNewTable={realtimeCtx.addTable} existingTableNumbers={tables.map(table => table.number)} />

        {sortedTables.map(table =>
          <TableCard table={table} key={table.id} />)}
      </div>
    </div>
  </div>;
}

function RestaurantDashboardPage() {

  return <RealtimeServiceContextProvider>
    <_RestaurantDashboardPage />
    </RealtimeServiceContextProvider>;
}

export default RestaurantDashboardPage;