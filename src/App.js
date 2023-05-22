import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as app from "./Services/app";
import Store from "./Redux/Store";
import AppRoutes from "./Routes/index";
import {setTopMessageState} from "./Redux/Reducers/Alert/TopMessage";
import {GetLangKeys} from "./Features/Common/GetLangTranslation/middleware";
import {SpinnerLines, MessageAlert} from "./Components";

function App() {
    const dispatch = useDispatch();
    let langKeys = useSelector((state) => state.Common.LangKeys);
    let linesSpinnerStatus = useSelector((state) => state.Spinners.Lines.show);
    let alertTopMessageSelector = useSelector((state) => state.Alerts.TopMessage.data);
    let lang = app.getCookie("lang", "en");
    useEffect(() => {
        dispatch(GetLangKeys(lang));
    }, []);
    return langKeys.count <= 0 ? (
        <div>Loading...</div>
    ) : (
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
            </React.Suspense>
            <AppRoutes />
        </div>
    );
}

export default App;
