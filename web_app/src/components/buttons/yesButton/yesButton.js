import Button from "../button/button";
import {useTranslation} from "react-i18next";

/**
 * Yes (green) button component
 */
export default function YesButton({
  attributes = {},
  text = "yes",
  onClick = () => { },
  ...props
}) {

  const { t, i18n } = useTranslation();

  return <Button
    onClick={onClick}
    text={t(text)}
    bgColor='bg-green-500 active:hover:bg-green-600'
    textColor='text-white'
    ring='focus:ring-green-500'
    border='border-transparent'
    attributes={attributes}
    {...props}
  />;
}
