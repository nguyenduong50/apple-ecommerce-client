import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import classes from './Register.module.css';

const Register = () => {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return(
        <div className={classes.register}>
            <Form method="post" className={classes["form-register"]}>               
                <p className="text-center fs-3 fst-italic text-secondary mb-4">Sign Up</p>
                {data && data.message && <p style={{color: 'red', textAlign: 'center'}}>{data.message}</p>}
                <input type="text" name="name" placeholder="Full Name" className="border border-bottom-0 border-secondary-subtle" required/>
                <input type="email" name="email" placeholder="Email" className="border border-bottom-0 border-secondary-subtle" required/>
                <input type="password" name="password" placeholder="Password" className="border border-bottom-0 border-secondary-subtle" required/>
                <input type="text" name="phone" placeholder="Phone" className="border border-secondary-subtle" required/>
                <button className="btn btn-dark rounded-0 mt-4 py-3" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "SIGN UP"}
                </button>
                <div className="mt-4 text-center fst-italic">
                    <span className="text-secondary">Login?</span>
                    <Link to="/login"> Click</Link>
                </div>
            </Form>
        </div>
    )
}

export default Register;