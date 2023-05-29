import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export async function FavProperty(propId) {
    const response = await http
    .Post("/prop/proprety/fav/", {proprety: Number(propId)}, "", true)
    .then((res) => res)
    .catch((err) => {
        // app.ShowTopMessageAlert(err.response.data.Error, "", "danger");
        return err;
    });
    return response;
}
