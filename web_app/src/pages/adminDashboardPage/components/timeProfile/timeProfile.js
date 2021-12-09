import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { useSnackbar } from 'notistack';
import { patchRestaurant } from "../../services/restaurants";
import {useTranslation} from "react-i18next";

export default function TimeProfile({restaurantId, prefix, onPatch, profileName, profileValue}){
    const { enqueueSnackbar } = useSnackbar();
    const { t, i18n } = useTranslation();

    return <div className='py-4'><Formik
    initialValues={{'profile': profileValue}}
    enableReinitialize={true}
    onSubmit={(values, { setSubmitting, setErrors}) => {
      const newValue = values.profile;
      patchRestaurant(restaurantId, {[profileName]: newValue}).then((newValue) => {
        onPatch(newValue[profileName]);
        setSubmitting(false);
        enqueueSnackbar(t("timeProfSaved"), { variant: "success" });
      }, () => {
        setErrors({comment: t("unableEndReq")});
        setSubmitting(false);
      });
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        
        <div className='flex pt-2'>
            <div className='flex-grow'>
            <Input name="profile"/>
            </div>
            <YesButton text={`${t("save")} ${t(prefix)}`} w={'w-32'} type="submit" disabled={isSubmitting} loading={isSubmitting} />
        </div>
        </Form>
                
    )}
  </Formik></div>
}