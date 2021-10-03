import Card from '../../../../components/card/card';
import { StopWatch } from '../stopWatch/stopWatch';
import { useElapsedMs, msToTime } from '../../../../hooks/useElapsedTime/useElapsedTime';

function TableCard({
   table,
   attributes = '',
   ...props
}) {

   return <Card>
      <div class="flex space-x-4">
         <div class="flex-2 flex flex-col">
               <div class="flex-1"><p class="font-mono text-4xl">
                  <StopWatch startTime={table.lastCourseDatetime} precision='seconds'/>
               </p></div>
               <div class="text-left"><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bottom-0 left-0">{table.nextCourse}</span>
            </div>

         </div>
         <div class="flex-1">
            <p class="font-mono text-right text-8xl">
               {table.tableNumber}
            </p>
         </div>
      </div>
   </Card>;
}

export default TableCard;