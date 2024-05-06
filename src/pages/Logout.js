import { redirect } from "react-router-dom";
import { API_ROOT } from "../Util/const";

export async function action(){
    await fetch(
        `${API_ROOT}/v2/auth/logout`,
        {
            credentials: 'include'
        }
    )

    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem('expiration');
    return redirect("/");
}