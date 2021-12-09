import { palette } from "../../../../palette";
import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import Button from "../../../../components/buttons/button/button";
import NoButton from "../../../../components/buttons/noButton/noButton";
import { useSnackbar } from 'notistack';
import { confirmContext } from "../../../../contexts/confirmContext";
import React from "react";

export default function Admin({admin, privacyFilter, deleteAdministrator, deleteAdministratorService}){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = React.useContext(confirmContext);
    const { t, i18n } = useTranslation();

    const handleDelete = () => {
      confirm({
        handleSuccess: () => {
          deleteAdministratorService(admin.id).then(() => {
            deleteAdministrator(admin.id);
            enqueueSnackbar(t("adminDel"), { variant: "success" });
          }).catch(() => {
            enqueueSnackbar("unableDelAdmin", { variant: "error" });
          });
        },
        handleCancel: () => {
            enqueueSnackbar("adminNotDel", { variant: "success" });
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

            <NoButton text={t("delete")} onClick={handleDelete} disabled={isSubmitting} />
        </div>

        </Form>
                
    )}
  </Formik></div>
}