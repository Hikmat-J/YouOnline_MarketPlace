import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export async function FavProperty(model) {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Post("/prop/proprety/fav/", model).catch((err) => {
        // app.ShowTopMessageAlert(err.response.data.Error, "", "danger");
        app.ChangeLinesSpinnerStatus(false);
        return err;
    });
    app.ChangeLinesSpinnerStatus(false);
    return response;
}
