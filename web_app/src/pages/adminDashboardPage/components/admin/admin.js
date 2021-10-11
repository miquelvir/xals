import { palette } from "../../../../palette";
import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import Button from "../../../../components/buttons/button/button";
import NoButton from "../../../../components/buttons/noButton/noButton";
import { useSnackbar } from 'notistack';
import { confirmContext } from "../../../../contexts/confirmContext";
import React from "react";
import { deleteSuperAdministrator as deleteSuperAdministratorService } from "../../services/superAdministrators";

export default function Admin({admin, privacyFilter, deleteAdministrator}){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = React.useContext(confirmContext);
    
    const handleDelete = () => {
      confirm({
        handleSuccess: () => {
          deleteSuperAdministratorService(admin.id).then(() => {
            deleteAdministrator(admin.id);
            enqueueSnackbar("root administrator deleted", { variant: "success" });
          }).catch(() => {
            enqueueSnackbar("unable to delete root administrator", { variant: "error" });
          });
        },
        handleCancel: () => {
            enqueueSnackbar("administrator not deleted", { variant: "success" });
        }});
    }

    return <div className='py-4'><Formik
    initialValues={admin}
    onSubmit={(values, { setSubmitting, setErrors}) => {
      
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        
        <div className='flex pt-2'>
            <div className={`flex-grow ${privacyFilter? 'filter blur-sm': ''}`}>
            <Input disabled name="email"/>
            </div>

            <NoButton text="delete" onClick={handleDelete} disabled={isSubmitting} />
        </div>

        </Form>
                
    )}
  </Formik></div>
}