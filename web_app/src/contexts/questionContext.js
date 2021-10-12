import React, { useState } from "react";
import QuestionModal from "../components/questionModal/questionModal";

export const questionContext = React.createContext(
    { prompt: (title, description, handleSubmit, handleCancel) => { } }
);

export const QuestionContextProvider = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const handleHideDialog = () => setShowDialog(false);
    const handleShowDialog = () => setShowDialog(true);

    const [handlers, setHandlers] = useState(
        {
            title: null,
            description: null,
            handleSubmit: handleHideDialog,
            handleCancel: handleHideDialog,
        }
    );
    const prompt = ({ title = null, description = null, handleSubmit = () => new Promise.resolve(), handleCancel = () => { } }) => {
        setHandlers(
            {
                title: title,
                description: description,
                handleSubmit: (...value) => new Promise(function (resolve, reject) {
                    handleSubmit(...value)
                        .then(
                            (...args) => {
                                resolve(...args);
                                handleHideDialog();
                            },
                            (...args) => reject(...args)
                        );
                }),
                handleCancel: () => {
                    handleHideDialog();
                    handleCancel();
                }
            }
        );
        handleShowDialog();
    }

    return <React.Fragment>
        {showDialog && <QuestionModal
            title={handlers.title}
            description={handlers.description}
            handleSubmit={handlers.handleSubmit}
            handleCancel={handlers.handleCancel}
            handleHide={handleHideDialog}
            handleShow={handleShowDialog}
        />}
        <questionContext.Provider value={{ prompt: prompt }}>
            {children}
        </questionContext.Provider>
    </React.Fragment>;
}