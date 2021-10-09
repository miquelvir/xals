import {Field} from 'formik';
import { palette } from '../../../palette';

/**
 * Base input component
 */
export default function Input({
    name,
    label=null,
    type='text',
    lead=null,
    trail=null,
    placeholder='',
    ...props
}) {

    return <Field type={type} name={name} > 
    
    {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => <div>
             {label && <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>}
             
             {meta.touched && meta.error && (
                   <label for={name} class="block text-sm font-medium text-red-700">{meta.error}</label>
                 )}
             <div class="mt-1 relative rounded-md shadow-sm">
                 {lead && <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span class={`${palette.textLight} sm:text-sm`}>
                         {lead}
                     </span>
                 </div>}
                 <input {...props} type={type} name={name} id={name} class={`block w-full p-2 ${lead? 'pl-7': ''} ${trail? 'pr-7': ''} sm:text-sm text-gray-900 rounded-md`} placeholder={placeholder} {...field}  />
                 {trail && <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                     <span class={`${palette.textLight} sm:text-sm`}>
                         {trail}
                     </span>
                 </div>}
             </div>
         </div>}
    
    </Field>;
}
