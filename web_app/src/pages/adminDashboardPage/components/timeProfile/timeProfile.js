import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import { useSnackbar } from 'notistack';
import { patchRestaurant } from "../../services/restaurants";

export default function TimeProfile({restaurantId, onPatch, profileName, profileValue}){
    const { enqueueSnackbar } = useSnackbar();

    return <div className='py-4'><Formik
    initialValues={{'profile': profileValue}}
    enableReinitialize={true}
    onSubmit={(values, { setSubmitting, setErrors}) => {
      const newValue = values.profile;
      patchRestaurant(restaurantId, {[profileName]: newValue}).then((newValue) => {
        onPatch(newValue);
        setSubmitting(false);
        enqueueSnackbar("time profile saved", { variant: "success" });
      }, () => {
        setErrors({comment: "unable to finalize request"});
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
            <YesButton text="save" type="submit" disabled={isSubmitting} loading={isSubmitting} />
        </div>
        </Form>
                
    )}
  </Formik></div>
}