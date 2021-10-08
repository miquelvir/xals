import TableCard from './components/tableCard/tableCard';
import NewTableCard from './components/tableCard/newTableCard';

function RestaurantDashboardPage() {

  var status = ['warning', 'alarm', 'random'];
  status.random = function() {
    return this[Math.floor(Math.random()*this.length)];
};
  
  return  <div> 
    <NewTableCard/>

  {[12, 14, 15, 18, 21].map(hours => {
    let date = new Date();
  date.setFullYear(2021, 9, 2);
  date.setHours(hours, 21-hours, 0, 0);
    return <TableCard table={{number: hours-2, lastCourseDatetime: date, nextCourse: 'desserts', status: status.random()}}/>
  })}
 </div> ;
}

export default RestaurantDashboardPage;