import TextActionsModal from '../textActionsModal/textActionsModal';
import ConfirmModal from '../confirmModal/confirmModal';
import NoButton from '../buttons/noButton/noButton';
import React from 'react';
import YesButton from '../buttons/yesButton/yesButton';
import Input from '../inputs/input/input';
import {Formik, Form} from 'formik';
import {useTranslation} from "react-i18next";

export default function QuestionModal({
  title = null,
  description = null,
  handleHide = () => { },
  handleShow = () => { },
  handleCancel = () => { },
  handleSubmit = (_) => new Promise.resolve(),
  ...props
}) {

  const { t, i18n } = useTranslation();
  return <Formik
       initialValues={{ question: '' }}
       onSubmit={(values, { setSubmitting, setErrors}) => {
          handleSubmit(values.question).then(() => {
            handleHide();
            setSubmitting(false);
          }, () => {
            setErrors({question: "unable to finalize request"}); //todo: this one?
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
                  }} text={t("cancel")} disabled={isSubmitting} />
                <YesButton text={t("submit")} type="submit" disabled={isSubmitting} loading={isSubmitting} />
              </React.Fragment>}
              {...props}>

              <div className='p-4 pt-4'>
                <Input name="question"/>
              </div>
            </TextActionsModal>
         </Form>
       )}
     </Formik>;
}
