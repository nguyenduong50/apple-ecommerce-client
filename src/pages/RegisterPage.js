import Register from '../components/auth/Register';
import { redirect } from "react-router-dom";
import { API_ROOT } from '../Util/const';

const RegisterPage = () => {
  return <Register />;
}

export default RegisterPage;

export async function action({request}){ 
    const data = await request.formData();

    //Validate Request
    if(data.get('email') === '' || data.get('password') === '' || data.get('name') === '' || data.get('phone') === ''){
      return{
        message: 'Please enter complete'
      }
    }

    if(data.get('password').length <= 8){
      return{
        message: 'Password must be more than 8'
      }
    }

    //Add new User
    const newUser = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      phone: data.get('phone')
    }

    const response = await fetch(
      `${API_ROOT}/v2/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
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

    return redirect('/');
}