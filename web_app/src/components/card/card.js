import clsx from 'clsx';

/**
 * Card component
 *
 * a surface with shadow, padding and margin
 */

const defaultAttributes = {
      'p-6': true,
      'm-8': true,
      'max-w-sm': true,
      'bg-white': true,
      'inline-block': true,
      'rounded-md': true,
      'shadow-lg': true,
      'overflow-auto': true
    };
function Card({
    attributes=defaultAttributes,
    children=null,
    ...props
    }) {

  return <div class={clsx({...defaultAttributes, ...attributes})} {...props}>
          {children}
   </div>;
}

export default Card;