/**
 * Card component
 *
 * a surface with shadow, padding and margin
 */
function Card({
    p=6,
    m=8,
    maxW='sm',
    bg='white',
    rounded='md',
    shadow='lg',
    attributes='',
    children=null,
    ...props
    }) {

  return <div class={`max-w-${maxW} m-${m} bg-${bg} p-${p} inline-block rounded-${rounded} shadow-${shadow} ${attributes}`} {...props}>
          {children}
   </div>;
}

export default Card;