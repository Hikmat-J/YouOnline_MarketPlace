import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as app from "./Services/app";
import Store from "./Redux/Store";
import AppRoutes from "./Routes/index";
import {setTopMessageState} from "./Redux/Reducers/Alert/TopMessage";
import {GetLangKeys} from "./Features/Common/GetLangTranslation/middleware";
import {SpinnerLines, MessageAlert, ToastAlert} from "./Components";
import {setToastAlertState} from "./Redux/Reducers/Alert/Toast/slice";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    let langKeys = useSelector((state) => state.Common.LangKeys);
    let linesSpinnerStatus = useSelector((state) => state.Spinners.Lines.show);
    let alertTopMessageSelector = useSelector((state) => state.Alerts.TopMessage.data);
    let toastAlertSelector = useSelector((state) => state.Alerts.Toast.data);
    let lang = app.getCookie("lang", "en");
    useEffect(() => {
        dispatch(GetLangKeys(lang));
    }, []);

    useEffect(() => {
        if (langKeys.status === "succeeded") {
            // const loaderElement = document.querySelector(".loader-container");
            // if (loaderElement) {
            //     loaderElement.remove();
            //     setLoading(!isLoading);
            // }
        }
    });
    if (isLoading) {
        return null;
    }

    return (
        <div style={{direction: lang == "ar" ? "rtl" : "ltr"}} lang={lang === "ar" ? "ar" : "en"}>
            <React.Suspense>
                {linesSpinnerStatus && <SpinnerLines Show={true} />}
                {alertTopMessageSelector.show && (
                    <MessageAlert
                        Message={alertTopMessageSelector.messageKey}
                        Link={alertTopMessageSelector.link}
                        Class={alertTopMessageSelector.class}
                        Show={true}
                        Close={() => {
                            Store.dispatch(setTopMessageState({...alertTopMessageSelector, show: false}));
                        }}
                    />
                )}
                {toastAlertSelector.show && (
                    <ToastAlert
                        Header={toastAlertSelector.header}
                        Message={toastAlertSelector.message}
                        Body={toastAlertSelector.body}
                        messageType={toastAlertSelector.messageType}
                        Show={true}
                        Close={() => {
                            Store.dispatch(setToastAlertState({...toastAlertSelector, show: false}));
                        }}
                    />
                )}
                <AppRoutes />
            </React.Suspense>
        </div>
    );
}

export default App;
