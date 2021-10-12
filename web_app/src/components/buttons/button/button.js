import clsx from 'clsx';
import { palette } from '../../../palette';

/**
 * Base button component
 */
const defaultAttributes = {
      'm-1': true,
      'inline-flex': true,
      'justify-center': true,
      'rounded-md': true,
      'border': false,
      'shadow-sm': true,
      'px-4': true,
      'py-2': true,
      'text-base': true,
      'font-medium': true,
      'text-white': true,
      'focus:outline-none': true,
      'focus:ring-2': true,
      'focus:ring-offset-2': true,
      'sm:ml-3': true,
      'sm:text-sm': true,
      'disabled:opacity-50': true,
      'select-none': true
    };

export default function Button({
    text,
    bgColor=palette.bg_responsive,
    textColor=palette.text,
    ring='focus:ring-gray-500',
    border=palette.bg,
    attributes=defaultAttributes,
    onClick= () => {},
    w = 'w-full sm:w-auto',
    loading=false,
    ...props
    }) {
  return <button  onClick={onClick} type="button" className={clsx(
    {...defaultAttributes, 
    [bgColor]: true, 
    [textColor]: true,
    [ring]: true, 
    [w]: true,
    [border]: true, 
    ...attributes})} {...props}>
      {loading && <span className={`animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-75 ${palette.surface1}`}></span>}
  {text}
</button>;
}
