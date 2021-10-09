import TextActionsModal from '../textActionsModal/textActionsModal';
import ConfirmModal from '../confirmModal/confirmModal';
import NoButton from '../buttons/noButton/noButton';
import React from 'react';
import YesButton from '../buttons/yesButton/yesButton';
import Input from '../inputs/input/input';
import {Formik, Form} from 'formik';

export default function QuestionModal({
  title = null,
  description = null,
  handleHide = () => { },
  handleShow = () => { },
  handleCancel = () => { },
  handleSubmit = (_) => new Promise.resolve(),
  ...props
}) {
  
  return <React.Fragment>
    <Formik
       initialValues={{ question: '' }}
       onSubmit={(values, { setSubmitting, setErrors}) => {
         console.log(values, values.question);
         console.log(handleSubmit);
          handleSubmit(values.question).then(() => {
            handleHide();
            setSubmitting(false);
          }, () => {
            setErrors({question: "unable to finalize request"});
            setSubmitting(false);
          });
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <TextActionsModal
              handleHide={handleHide}
              title={title}
              description={description}
              disabled={isSubmitting}
              actions={<React.Fragment>
                <NoButton onClick={() => {
                  handleHide();
                  handleCancel();
                  }} text="cancel" disabled={isSubmitting} />
                <YesButton text="submit" type="submit" disabled={isSubmitting} loading={isSubmitting} />
              </React.Fragment>}
              {...props}>

              <div className='p-4 pt-4'>
                <Input name="question"/>
              </div>
            </TextActionsModal>
         </Form>
       )}
     </Formik>

     
  </React.Fragment>;
}
