import Button from "../button/button";

/**
 * No (red) button component
 */
export default function NoButton({
    attributes={},
    text="no",
    onClick= () => {},
    ...props
    }) {
  return <Button 
            onClick={onClick}
            text={text} 
            bgColor='bg-red-600 active:hover:bg-red-700'
            textColor='text-white'
            ring='focus:ring-red-500'
            border='border-transparent'
            attributes={attributes}
            {...props}
          />;
}
