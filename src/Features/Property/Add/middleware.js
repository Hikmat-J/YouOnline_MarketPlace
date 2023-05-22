import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export async function AddProperty(model, OnSuccessFunc) {
    // app.ChangeLinesSpinnerStatus(true);
    // const response = await http.Post("/prop/proprety/add/ ", model);
    // app.ChangeLinesSpinnerStatus(false);
    // return response;
    // app.ChangeLinesSpinnerStatus(true);
    app.ChangeLinesSpinnerStatus(true);
    const response = await http
    .Post("/prop/proprety/add/ ", model, {}, true)
    .then((res) => {
        if (OnSuccessFunc && typeof OnSuccessFunc === "function") OnSuccessFunc(res);
        return res;
    })
    .catch((err) => {
        app.ShowTopMessageAlert(err.response.data, "", "danger");
        app.ChangeLinesSpinnerStatus(false);
        return err;
    });
    app.ChangeLinesSpinnerStatus(false);
    return response;
}
