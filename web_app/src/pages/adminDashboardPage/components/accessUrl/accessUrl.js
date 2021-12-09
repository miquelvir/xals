import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import NoButton from "../../../../components/buttons/noButton/noButton";
import { useSnackbar } from 'notistack';
import { patchRestaurantAccessToken as patchRestaurantAccessTokenService } from "../../services/restaurantAccessTokens";
import {useTranslation} from "react-i18next";

export default function AccessUrl({privacyFilter, restaurantId, token, onDelete, onPatch}){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { t, i18n } = useTranslation();


    const handleCopyUrlToClipboard = () => {
        // openInNewTab(accessUrl.url);
        if (privacyFilter) {
            enqueueSnackbar(t("disablePrivMode"), {variant: 'warning'});
            return;
        }
        navigator.clipboard.writeText(token.url);
        enqueueSnackbar(t("urlCopied"), {variant: 'success'});
    }

    const handleSubmit = (comment) => {

    }


    return <div className='py-4'><Formik
    initialValues={token}
    onSubmit={(values, { setSubmitting, setErrors}) => {
       patchRestaurantAccessTokenService(restaurantId, token.id, values.comment).then((newToken) => {
        onPatch(token.id, newToken);
        setSubmitting(false);
        enqueueSnackbar(t("tokenCommentSaved"), { variant: "success" });
      }, () => {
        setErrors({comment: "unableEndReq"});
        setSubmitting(false);
      });
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        
        <div className='flex pt-2'>
            <div className='flex-grow'>
            <Input name="comment"/>
            </div>

            <NoButton text={t("delete")} disabled={isSubmitting} onClick={onDelete} />
            <YesButton text={t("save")} type="submit" disabled={isSubmitting} loading={isSubmitting} />

            
        </div>

        <div className='flex pb-2'>
            <div className={`flex-grow ${privacyFilter? 'filter blur-sm': ''}`} onClick={handleCopyUrlToClipboard}>
                <Input name="url" disabled />
            
            </div>
        </div>

        </Form>
                
    )}
  </Formik></div>
}