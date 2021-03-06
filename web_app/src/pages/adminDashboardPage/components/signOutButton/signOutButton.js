import React from 'react';
import { useHistory } from "react-router-dom";
import { useGoogleLogout} from 'react-google-login';
import { useSnackbar } from 'notistack';
import { logout } from '../../services/logout';
import {useTranslation} from "react-i18next";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function SignOutButton({}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation();

  let history = useHistory();
    const onLogoutSuccess = () => {
      logout().then(() => {
        enqueueSnackbar(t("logOut"), {variant: 'success'})
        history.push('/login');
      }).catch(() => {
        enqueueSnackbar(t("unableLogOutServer"), {variant: 'error'})
      })
    
    }
    
    const onLogoutFailure = () => {
      enqueueSnackbar(t("unableLogOutGoogle"), {variant: 'error'})
    }

  const { signOut } = useGoogleLogout({
    clientId,
      onLogoutSuccess,
      onLogoutFailure
  });

  
    
    return <div className='p-2 inline-block'><div onClick={signOut} className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 sm:h-8 sm:w-8">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    </div></div>;
}