import BaseCard from './baseCard';
import { StopWatch } from '../stopWatch/stopWatch';
import ActionMenu from '../actionMenu/actionMenu';
import React from 'react';
import { useState } from 'react';

const STATUS_ALARM = 'alarm';
const STATUS_WARNING = 'warning';

const useTheme = (status) => (status === STATUS_ALARM? {
   bg:'bg-red-400 hover:bg-red-500',
   fg: 'bg-red-100',
   text: 'text-gray-800'
}: status === STATUS_WARNING? {
   bg: 'bg-yellow-200 hover:bg-yellow-300',
   fg: 'bg-yellow-100',
   text: 'text-gray-800'
}: {
   bg: 'bg-green-200 hover:bg-green-300',
   fg: 'bg-green-50',
   text: 'text-gray-800'
});

function TableCard({
   table,
   ...props
}) {

   const [showActionMenu, setShowActionMenu] = useState(false);
   const handleShowActionMenu = () => setShowActionMenu(true);
   const handleHideActionMenu = () => setShowActionMenu(false);

   const theme = useTheme(table.status);

   return <React.Fragment>
      
      {showActionMenu && <ActionMenu handleHide={handleHideActionMenu} handleShow={handleShowActionMenu} table={table}/>}

       <BaseCard attributes={{[theme.bg]: true}} onClick={handleShowActionMenu} {...props}>

      <div className={`flex space-x-4 ${theme.text}`}>
         <div className="flex-2 flex flex-col">
               <div className="flex-1"><p className="font-mono text-4xl">
                  <StopWatch startTime={table.lastCourseDatetime} precision='seconds'/>
               </p></div>
               <div className="text-left">
                  <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 bottom-0 left-0 ${theme.fg}`}>
                     {table.nextCourse}
                  </span>
            </div>

         </div>
         <div className="flex-1">
            <p className="font-mono text-right text-8xl">
               {table.number}
            </p>
         </div>
      </div>
   </BaseCard></React.Fragment>;
}

export default TableCard;