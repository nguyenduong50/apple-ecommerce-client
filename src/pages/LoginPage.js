import { Fragment } from "react";
import { redirect } from "react-router-dom";
import Login from '../components/auth/Login';

const LoginPage = () => {
    return (
        <Fragment>
            <Login />
        </Fragment>
    );
}

export default LoginPage;

export async function action({request}){
    const data = await request.formData();

    const user = {
      email: data.get('email'),
      password: data.get('password')
    }

    //Validate Request
    if(data.get('email') === '' || data.get('password') === '' ){
      return{
        message: 'Please enter email and password'
      }
    }

    const response = await fetch(
      'http://localhost:5000/v2/auth/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
      }
    )

    if(response.status === 422  || response.status === 400 || response.status === 502){
      return response;
    }

    if(!response.ok){
      return{
        message: 'Error unknow'
      }
    }

    const resData = await response.json();
    
    localStorage.setItem('currentUser', resData.user);
    localStorage.setItem('accessToken', resData.accessToken);
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect("/");
}