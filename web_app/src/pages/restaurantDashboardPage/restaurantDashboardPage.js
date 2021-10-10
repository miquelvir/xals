import TableCard from './components/tableCard/tableCard';
import NewTableCard from './components/tableCard/newTableCard';
import SortButton, { SORT_PRIORITY, SORT_NUMBER_ASCENDING, SORT_NUMBER_DESCENDING } from './components/sortButton/sortButton';
import { useState, useEffect } from 'react';
import ThemeButton from '../../components/themeButton/themeButton';
import LanguageButton from '../../components/languageButton/languageButton';
import { palette } from '../../palette';
import { RealtimeServiceContextProvider } from './contexts/realtimeService/realtimeServiceContext';

const sortProviders = {
  [SORT_PRIORITY]: (table1, table2) => table1.lastCourseDatetime - table2.lastCourseDatetime,
  [SORT_NUMBER_ASCENDING]: (table1, table2) => table1.number - table2.number,
  [SORT_NUMBER_DESCENDING]: (table1, table2) => table2.number - table1.number,
}
function _RestaurantDashboardPage() {




  var status = ['alarm', 'warning', 'random'];
  status.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const [sort, setSort] = useState(SORT_PRIORITY);

  let _tables = [12, 14, 15, 2, 18, 21].map(hours => {
    let date = new Date();
    date.setFullYear(2021, 9, 2);
    date.setHours(hours, 21 - hours, 0, 0);
    return { number: (hours - 2).toString(), lastCourseDatetime: date, nextCourse: 'desserts', status: status[Math.trunc(hours * 3 / 24)] }
  });

  const [tables, _setTables] = useState(_tables);
  const setTables = (newTables) => {
    newTables.sort(sortProviders[sort]);
    _setTables(newTables);
  }
  const addNewTable = (table) => setTables([...tables, table]);
  useEffect(() => setTables(tables), [sort]);

  return <div>
    <div className='p-2 pl-8 pr-8 inline-block w-full'>
      <div className='inline-block'><p className={`font-mono text-4xl ${palette.text}`}>
        Restaurante 21
      </p></div>
      <div className='float-right'>
        <SortButton sort={sort} setSort={setSort} />
        <ThemeButton />
        <LanguageButton /></div>

    </div>

    <div className="px-4">
      <div className="flex flex-wrap  -mx-4">
        <NewTableCard addNewTable={addNewTable} existingTableNumbers={tables.map(table => table.number)} />

        {tables.map(table =>
          <TableCard table={table} key={table.number} />)}
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