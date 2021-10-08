import Modal from '../../../../components/modal/modal';
import ConfirmModal from '../../../../components/confirmModal/confirmModal';
import {twoPadding} from '../../../../helpers/numberPadding';
import React from 'react';
import { confirmContext } from '../../../../contexts/confirmContext';

function ActionMenu({
    table,
    handleHide=()=>{},
    handleShow=()=>{},
   ...props
}) {
    const confirm = React.useContext(confirmContext);

    const handleFinish = () => {
        handleHide();
        confirm({
            handleSuccess: () => {
                
            },
            handleCancel: () => {
                handleShow();
            }})
        // TODO link to backend
    };

   return <React.Fragment>
       <ConfirmModal />
       <Modal handleHide={handleHide} {...props}>
       <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Table {table.number}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                last course was served at {twoPadding(table.lastCourseDatetime.getHours())}:{twoPadding(table.lastCourseDatetime.getMinutes())}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button onClick={handleHide} type="button" class="m-1 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" >
          cancel
        </button>
        <button onClick={() => {}} type="button" class="m-1 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" >
          {table.nextCourse}
        </button>
        <button onClick={handleFinish} type="button" class="m-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" >
          finish
        </button>
  </div>
       </Modal></React.Fragment>;
}

export default ActionMenu;