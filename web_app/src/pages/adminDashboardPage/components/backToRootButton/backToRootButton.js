import React from 'react';


export default function BackToRootButton({handleClick}) {
    return <div className='p-2 inline-block'><div onClick={handleClick} className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 sm:h-8 sm:w-8">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
</svg>
    </div></div>;
}