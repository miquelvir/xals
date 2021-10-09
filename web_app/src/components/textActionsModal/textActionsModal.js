import Modal from "../modal/modal";

/**
 * Modal component with a space for title, description and buttons
 */
function TextActionsModal({
    handleHide= () => {},
    title=null,
    description=null,
    actions=null,
    children=null,
    ...props
    }) {
  return <Modal handleHide={handleHide} {...props}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
   {(title || description) && <div class="sm:flex sm:items-start">
     <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
       {title && <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
         {title}
       </h3>}
       {description && <div class="mt-2">
         <p class="text-sm text-gray-500">
           {description}
         </p>
       </div>}
     </div>
   </div>}

   {children}
 </div>
 {actions && <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
   {actions}
</div>}
  </Modal>;
}

export default TextActionsModal;