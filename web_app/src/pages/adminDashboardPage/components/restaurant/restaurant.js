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

    const handleDelete = () => {
      confirm({
        handleSuccess: () => {
          deleteRestaurantService(restaurant.id).then(() => {
              deleteRestaurant(restaurant.id);
              enqueueSnackbar("restaurant deleted", { variant: "success" });
            }).catch(() => {
              enqueueSnackbar("unable to delete restaurant", { variant: "error" });
            })
            
        },
        handleCancel: () => {
            enqueueSnackbar("restaurant not deleted", { variant: "success" });
        }});
    }

    const handleGoToAdmin = () => setRestaurant(restaurant);


    return <div className='py-4'><Formik
    initialValues={restaurant}
    onSubmit={(values, { setSubmitting, setErrors}) => {
       patchRestaurantService(restaurant.id, values.name).then((newRestaurant) => {
         patchRestaurant(restaurant.id, newRestaurant);
         setSubmitting(false);
         enqueueSnackbar("restaurant name saved", { variant: "success" });
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
            <Input name="name"/>
            </div>

            <NoButton text="delete" onClick={handleDelete} disabled={isSubmitting} />
            <YesButton text="save" type="submit" disabled={isSubmitting} loading={isSubmitting} />
            <Button text="admin" onClick={handleGoToAdmin} disabled={isSubmitting} />
        </div>

        </Form>
                
    )}
  </Formik></div>
}