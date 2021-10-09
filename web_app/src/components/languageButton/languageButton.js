import React from 'react';
import { languageContext } from '../../contexts/languageContext';


export default function LanguageButton() {
    const languageCtx = React.useContext(languageContext);
    
    return <div class='p-2 inline-block'><div onClick={languageCtx.toggle} class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 sm:h-8 sm:w-8">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
    </div></div>;
}