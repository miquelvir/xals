import { palette } from "../../palette";
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
    icon=null,
    disabled=false,
    ...props
    }) {
  return <Modal handleHide={handleHide} disabled={disabled} {...props}>
  <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
   {(title || description) && <div class="sm:flex sm:items-start">
    {icon && <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            {icon}
          </div>}

     <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
       {title && <h3 class={`text-lg leading-6 font-medium ${palette.textBold}`} id="modal-title">
         {title}
       </h3>}
       {description && <div class="mt-2">
         <p class={`text-sm ${palette.text}`}>
           {description}
         </p>
       </div>}
     </div>
   </div>}

   {children}
 </div>
 {actions && <div class={`${palette.surface1} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-lg`}>
   {actions}
</div>}
  </Modal>;
}

export default TextActionsModal;