import React, {useState} from "react";
import ConfirmModal from "../components/confirmModal/confirmModal";

const confirmContext = React.createContext(
    {
        confirm: (title, description, handleSuccess, handleCancel) => {}
    }
);

const BaseConfirmContextProvider = ({children}) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const handleHideConfirmDialog = () => setShowConfirmDialog(false);

    const [confirmHandler, setConfirmHandler] = useState(
        {
            title: undefined,
            description: undefined,
            handleSuccess: handleHideConfirmDialog,
            handleCancel: handleHideConfirmDialog,
        }
    );
    const confirm = ({title = undefined, description = undefined, handleSuccess = () => {}, handleCancel = () => {}}) => {
        setShowConfirmDialog(true);
        setConfirmHandler(
            {
              title: title,
              description: description,
              handleSuccess: () => {
                handleHideConfirmDialog();
                handleSuccess();
                },
              handleCancel: () => {
                  handleHideConfirmDialog();
                  handleCancel();
              }
            }
        );
    }

    return <React.Fragment>
            {showConfirmDialog && <ConfirmModal 
                title={confirmHandler.title} 
                description={confirmHandler.description} 
                handleSuccess={confirmHandler.handleSuccess}
                handleCancel={confirmHandler.handleCancel}
            />}
            <confirmContext.Provider value={confirm}>
                {children}
            </confirmContext.Provider>
        </React.Fragment>;
}

export {
  confirmContext,
  BaseConfirmContextProvider
};