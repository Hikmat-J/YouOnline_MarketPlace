import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export async function AddProperty(model) {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Post("/prop/proprety/add/ ", model);
    app.ChangeLinesSpinnerStatus(false);
    return response;
}
