import axios from "axios";
import * as app from "./app";
import * as Constants from "../Utils/constants";

export async function Get(url) {
    let token = app.getCookie("jwt-Auzhorization", "");
    let headers = {
        Authorization: token === "" ? "" : `Bearer ${token}`,
        "content-type": "application/json",
    };
    return axios
        .get(Constants.BASE_FRONTEND_API_URL + url, {
            headers,
        })
        .then((resSuccess) => {
            return HandleResponse(resSuccess);
        })
        .catch((err) => {
            return HandleError(err);
        });
}

export async function Post(url, body, params, isFormData = true) {
    let token = app.getCookie("jwt-Auzhorization", "");
    let headers = {
        Authorization: token === "" ? "" : `Bearer ${token}`,
        "content-type": isFormData ? "multipart/form-data" : "application/json",
    };
    return axios
        .post(Constants.BASE_FRONTEND_API_URL + url, body, { params, headers })
        .then((resSuccess) => {
            return HandleResponse(resSuccess);
        })
        .catch((err) => {
            return HandleError(err);
        });
}


export async function Put(url, body, params, isFormData = true) {
    let token = app.getCookie("jwt-Auzhorization", "");
    let headers = {
        Authorization: token === "" ? "" : `Bearer ${token}`,
        "content-type": isFormData ? "multipart/form-data" : "application/json",
    };
    return axios
        .put(Constants.BASE_FRONTEND_API_URL + url, body, { params, headers })
        .then((resSuccess) => {
            return HandleResponse(resSuccess);
        })
        .catch((err) => {
            return HandleError(err);
        });
}




/// ------------- HELPERS --------------- ///



async function HandleError(error) {
    return Promise.reject(error);
}

function HandleResponse(response, methodType) {
    let data = {};
    data = response.data.data;

    if (response.status === 200) {
        // if (methodType == "token") {
        //     app.setCookie("jwt-Auzhorization", response.data.token);
        //     data.token = "";
        //     localStorage.setItem("user", JSON.stringify(data));
        // }
        return data;
    }
    // canReCall = false;
    throw new Error(response.statusText);
}
