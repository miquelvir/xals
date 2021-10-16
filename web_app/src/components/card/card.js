import clsx from 'clsx';

/**
 * Card component
 *
 * a surface with shadow, padding and margin
 */

const defaultAttributes = {
      'p-6': true,
      'max-w-sm': false,
      'bg-white': true,
      'inline-block': false,
      'rounded-md': true,
      'shadow-lg': true,
      'overflow-auto': true,
    };
function Card({
    attributes=defaultAttributes,
    children=null,
    ...props
    }) {
  return <div className={clsx({...defaultAttributes, ...attributes})} {...props}>
          {children}
   </div>;
}

export default Card;