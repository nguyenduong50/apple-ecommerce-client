import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { tokenLoader, getTokenDuration } from '../Util/auth';
import { useSubmit } from 'react-router-dom';

const Root = () => {
    const token = tokenLoader();
    const submit = useSubmit();

    useEffect(() => {
      if(!token){
        return;
      }
  
      if(token === 'EXPIRED'){
        submit(null, {action: '/logout', method: 'post'});
        return;
      }
  
      const tokenDuration = getTokenDuration();
  
      setTimeout(() => {
        submit(null, {action: '/logout', method: 'post'});
      }, tokenDuration)
    }, [token, submit]);

    return <Layout />;
}

export default Root;