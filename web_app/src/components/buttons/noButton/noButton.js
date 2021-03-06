import Button from "../button/button";
import { useTranslation } from 'react-i18next';

/**
 * No (red) button component
 */
export default function NoButton({
    attributes={},
    text="no",
    onClick= () => {},
    ...props
    }) {

    const { t, i18n } = useTranslation();

  return <Button 
            onClick={onClick}
            text={t(text)} //
            bgColor='bg-red-600 hover:active:bg-red-700'
            textColor='text-white'
            ring='focus:ring-red-500'
            border='border-transparent'
            attributes={attributes}
            {...props}
          />;
}
