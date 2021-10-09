import clsx from 'clsx';

/**
 * Base button component
 */
const defaultAttributes = {
      'm-1': true,
      'w-full': true,
      'inline-flex': true,
      'justify-center': true,
      'rounded-md': true,
      'border': true,
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
      'sm:w-auto': true,
      'sm:text-sm': true,
    };

export default function Button({
    text,
    bgColor='bg-white hover:bg-gray-50',
    textColor='text-gray-700',
    ring='focus:ring-gray-500',
    border='border-gray-300',
    attributes=defaultAttributes,
    onClick= () => {},
    ...props
    }) {
  return <button onClick={onClick} type="button" class={clsx(
    {...defaultAttributes, 
    [bgColor]: true, 
    [textColor]: true,
    [ring]: true, 
    [border]: true, 
    ...attributes})} {...props}>
  {text}
</button>;
}
