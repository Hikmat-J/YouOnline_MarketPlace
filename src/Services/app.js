import React from "react";
import store from "../Redux/Store";
import {setTopMessageState, alertTopMessageModel} from "../Redux/Reducers/Alert/TopMessage/index";
import {setLinesSpinnerStatus} from "../Redux/Reducers/Spinners/Lines/slice";
import {toastAlertModel} from "../Redux/Reducers/Alert/Toast/model";
import {setToastAlertState} from "../Redux/Reducers/Alert/Toast/slice";

export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name, defValue) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        //delete spaces from word
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return defValue;
}

export function translate(key) {
    let languagesKeys = store.getState().Common.LangKeys.data.Keys;
    if (key == undefined || typeof key != "string") return "";
    if ((languagesKeys && !Array.isArray(languagesKeys)) || languagesKeys === undefined) return key;
    let translateKey = key;
    languagesKeys.map((langKey) => {
        if (langKey.key === key) translateKey = langKey.value;
    });
    return translateKey;
}

export function ShowTopMessageAlert(messageKey = "", link = "", messageType = "success") {
    let alertModel = {...alertTopMessageModel};
    alertModel.show = true;
    alertModel.messageKey = messageKey;
    alertModel.link = link;
    switch (messageType) {
        case "success":
            alertModel.class = "bg-success";
            break;
        case "danger":
            alertModel.class = "bg-danger";
            break;
        case "warning":
            alertModel.class = "bg-warning";
            break;
        case "info":
            alertModel.class = "bg-info";
            break;
        default:
            break;
    }
    store.dispatch(setTopMessageState(alertModel));
}

export function ShowToastAlert(header = "", body = "", alertClass, messageType = "danger") {
    let alertModel = {...toastAlertModel, header, body};
    alertModel.class = alertClass;
    alertModel.header = header;
    alertModel.body = body;
    alertModel.messageType = messageType;
    alertModel.show = true;
    store.dispatch(setToastAlertState(alertModel));
}

export function ChangeLinesSpinnerStatus(show = false) {
    store.dispatch(setLinesSpinnerStatus(show));
}
