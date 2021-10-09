import Button from "../button/button";

/**
 * Yes (green) button component
 */
export default function YesButton({
  attributes = {},
  text = "yes",
  onClick = () => { },
  ...props
}) {
  return <Button
    onClick={onClick}
    text={text}
    bgColor='bg-green-500 active:hover:bg-green-600'
    textColor='text-white'
    ring='focus:ring-green-500'
    border='border-transparent'
    attributes={attributes}
    {...props}
  />;
}
