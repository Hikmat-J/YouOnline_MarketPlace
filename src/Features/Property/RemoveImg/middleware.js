import * as http from "../../../Services/http";
import * as app from "../../../Services/app";

export async function DeletePropertyImg(img_Id) {
    const response = await http
    .Delete("/prop/proprety/image/delete/" + img_Id, "", true)
    .then((res) => res)
    .catch((err) => {
        // app.ShowTopMessageAlert(err.response.data.Error, "", "danger");
        return err;
    });
    return response;
}
