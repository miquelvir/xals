import BaseCard from './baseCard';
import { useTranslation } from 'react-i18next';
import { palette } from '../../../../palette';
import React, {useState} from 'react';
import NewTableMenu from '../newTableMenu/newTableMenu';

function NewTableCard({
   addNewTable = (_) => {},
   existingTableNumbers = [],
   ...props
}) {
   const { t, i18n } = useTranslation();

   const [showNewTableMenu, setShowNewTableMenu] = useState(false);
   const handleShowNewTableMenu = () => setShowNewTableMenu(true);
   const handleHideNewTableMenu = () => setShowNewTableMenu(false);

   return <React.Fragment>
      {showNewTableMenu && <NewTableMenu 
      handleHide={handleHideNewTableMenu} 
      handleShow={handleShowNewTableMenu} 
      addNewTable={addNewTable}
      existingTableNumbers={existingTableNumbers}
      />}
   <BaseCard onClick={handleShowNewTableMenu} attributes={{
      'border-4': true, 
   'border-dashed': true, 
   [palette.bg_force_responsive]: true,
   [palette.text]: true}} {...props} disabled={false}>
      <div className='h-full w-full flex flex-wrap content-center text-center justify-center'>
            <p className="font-mono text-4xl">
               {t('newFem')}
            </p>
            </div>
   </BaseCard></React.Fragment>;
}

export default NewTableCard;