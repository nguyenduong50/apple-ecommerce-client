import { redirect } from "react-router-dom";

export async function action(){
    await fetch(
        'http://localhost:5000/v2/auth/logout',
        {
            credentials: 'include'
        }
    )

    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem('expiration');
    return redirect("/");
}