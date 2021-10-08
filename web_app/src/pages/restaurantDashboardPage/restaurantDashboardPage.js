import TableCard from './components/tableCard/tableCard';
import NewTableCard from './components/tableCard/newTableCard';
import SortButton, {SORT_PRIORITY, SORT_NUMBER_ASCENDING, SORT_NUMBER_DESCENDING} from './components/sortButton/sortButton';
import { useState } from 'react';

const sortServices = {
  [SORT_PRIORITY]: (table1, table2) => table1.lastCourseDatetime - table2.lastCourseDatetime,
  [SORT_NUMBER_ASCENDING]: (table1, table2) => table1.number - table2.number,
  [SORT_NUMBER_DESCENDING]: (table1, table2) => table2.number - table1.number,
}
function RestaurantDashboardPage() {

  var status = ['alarm', 'warning', 'random'];
  status.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const [sort, setSort] = useState(SORT_PRIORITY);

  let tables = [12, 14, 15, 2, 18, 21].map(hours => {
    let date = new Date();
    date.setFullYear(2021, 9, 2);
    date.setHours(hours, 21 - hours, 0, 0);
    return { number: hours - 2, lastCourseDatetime: date, nextCourse: 'desserts', status: status[Math.trunc(hours * 3 / 24)] }
  });

  tables.sort(sortServices[sort]);

  return <div>
    <SortButton sort={sort} setSort={setSort}/>

    <NewTableCard />

    {tables.map(table => <TableCard table={table} />)}
  </div>;
}

export default RestaurantDashboardPage;