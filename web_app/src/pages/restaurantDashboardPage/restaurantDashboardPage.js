import TableCard from './components/tableCard/tableCard';
import NewTableCard from './components/tableCard/newTableCard';

function RestaurantDashboardPage() {
  
  return  <div> 
    <NewTableCard/>
    
  {[12, 14, 15, 18, 21].map(hours => {
    let date = new Date();
  date.setFullYear(2021, 9, 2);
  date.setHours(hours, 21-hours, 0, 0);
    return <TableCard table={{tableNumber: hours-2, lastCourseDatetime: date, nextCourse: 'desserts'}}/>
  })}
 </div> ;
}

export default RestaurantDashboardPage;