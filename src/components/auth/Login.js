import { Form, Link, useActionData } from "react-router-dom";
import classes from './Login.module.css';

const Register = () => {
    const data = useActionData();
    
    return(
        <div className={classes.login}>
            <Form method="post" className={classes["form-login"]}>
                <p className="text-center fs-3 fst-italic text-secondary mb-4">Sign In</p>
                {data && data.message && <p style={{color: 'red', textAlign: 'center'}}>{data.message.split(": ")[1]}</p>}
                <input type="email" name="email" placeholder="Email" className="border border-bottom-0 border-secondary-subtle" required/>
                <input type="password" name="password" placeholder="Password" className="border border-secondary-subtle" required/>
                <button className="btn btn-dark rounded-0 mt-4 py-3">SIGN IN</button>
                <div className="mt-4 text-center fst-italic">
                    <span className="text-secondary">Create an account?</span>
                    <Link to="/register"> Sign up</Link>
                </div>
            </Form>
        </div>
    )
}

export default Register;