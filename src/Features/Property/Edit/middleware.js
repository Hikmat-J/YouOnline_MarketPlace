import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export default async function GetPropById(id, OnSuccessFunc) {
    const response = await http
    .Get("/prop/proprety/view/" + id)
    .then((res) => {
        if (OnSuccessFunc && typeof OnSuccessFunc === "function") OnSuccessFunc(res);
        return res;
    })
    .catch((err) => {
        return err;
    });
    return response;
}

export async function UpdatePropertyApi(id, model, OnSuccessFunc) {
    const response = await http
    .Put("/prop/proprety/update/" + id, model, {}, true)
    .then((res) => {
        if (OnSuccessFunc && typeof OnSuccessFunc === "function") OnSuccessFunc(res);
        return res;
    })
    .catch((err) => {
        return err;
    });
    return response;
}
