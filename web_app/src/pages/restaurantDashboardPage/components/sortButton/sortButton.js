import React from 'react';

export const SORT_PRIORITY = 'priority';
export const SORT_NUMBER_ASCENDING = 'number-ascending';
export const SORT_NUMBER_DESCENDING = 'number-descending';
const SORTS = [SORT_PRIORITY, SORT_NUMBER_ASCENDING, SORT_NUMBER_DESCENDING];

function SortButton({
    sort, setSort
}) {

    const handleToggleSort = () => setSort(SORTS[(SORTS.indexOf(sort) + 1) % SORTS.length]);
    
    return <div className='p-2 inline-block'><div onClick={handleToggleSort} className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 sm:h-8 sm:w-8">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         {sort === SORT_PRIORITY?  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        : sort === SORT_NUMBER_ASCENDING? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
}
        </svg>
    </div></div>;
}

export default SortButton;