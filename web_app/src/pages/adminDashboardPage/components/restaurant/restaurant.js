import { palette } from "../../../../palette";
import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import Button from "../../../../components/buttons/button/button";
import NoButton from "../../../../components/buttons/noButton/noButton";
import { useSnackbar } from 'notistack';
import { confirmContext } from "../../../../contexts/confirmContext";
import React from "react";
import { patchRestaurant as patchRestaurantService, deleteRestaurant as deleteRestaurantService, patchRestaurant } from "../../services/restaurants";

export default function Restaurant({restaurant, setRestaurant, patchRestaurant, deleteRestaurant}){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = React.useContext(confirmContext);
    const { t, i18n } = useTranslation();

    const handleDelete = () => {
      confirm({
        handleSuccess: () => {
          deleteRestaurantService(restaurant.id).then(() => {
              deleteRestaurant(restaurant.id);
              enqueueSnackbar(t("restDel"), { variant: "success" });
            }).catch(() => {
              enqueueSnackbar(t("unableDelRest"), { variant: "error" });
            })
            
        },
        handleCancel: () => {
            enqueueSnackbar(t("restNotDel"), { variant: "success" });
        }});
    }

    const handleGoToAdmin = () => setRestaurant(restaurant);


    return <div className='py-4'><Formik
    initialValues={restaurant}
    onSubmit={(values, { setSubmitting, setErrors}) => {
       patchRestaurantService(restaurant.id, {'name': values.name}).then((newRestaurant) => {
         patchRestaurant(restaurant.id, newRestaurant);
         setSubmitting(false);
         enqueueSnackbar(t("NameSaved"), { variant: "success" });
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
            <Input name="name"/>
            </div>

            <NoButton text={t("delete")} onClick={handleDelete} disabled={isSubmitting} />
            <YesButton text={t("save")} type="submit" disabled={isSubmitting} loading={isSubmitting} />
            <Button text={t("admin")} onClick={handleGoToAdmin} disabled={isSubmitting} />
        </div>

        </Form>
                
    )}
  </Formik></div>
}