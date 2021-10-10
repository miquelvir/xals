import { palette } from "../../../../palette";
import Input from "../../../../components/inputs/input/input";
import { Formik, Form} from "formik";
import YesButton from "../../../../components/buttons/yesButton/yesButton";
import Button from "../../../../components/buttons/button/button";
import NoButton from "../../../../components/buttons/noButton/noButton";
import { useSnackbar } from 'notistack';
    
export default function AccessUrl({privacyFilter, accessUrl}){

    const handleDeleteAccessUrl = () => {

    };
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    
    const handleCopyUrlToClipboard = () => {
        // openInNewTab(accessUrl.url);
        if (privacyFilter) {
            enqueueSnackbar('disable the privacy mode on the top right corner first', {variant: 'warning'});
            return;
        }
        navigator.clipboard.writeText(accessUrl.url);
        enqueueSnackbar('the url has been copied to your clipboard, keep it private!', {variant: 'success'});
    }

    const handleSubmit = (comment) => {

    }


    return <div className='py-4'><Formik
    initialValues={accessUrl}
    onSubmit={(values, { setSubmitting, setErrors}) => {
      console.log(values);
       handleSubmit(values.comment).then(() => {
         setSubmitting(false);
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
            <Input name="comment"/>
            </div>

            <NoButton text="delete" disabled={isSubmitting} loading={isSubmitting} />
            <YesButton text="save" type="submit" disabled={isSubmitting} loading={isSubmitting} />

            
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