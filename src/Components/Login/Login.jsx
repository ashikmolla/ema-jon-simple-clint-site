import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { AuthContext } from '../../Provider/AutheProvider';

const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null)
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)
    const from = location.state?.from?. pathname || '/';


    const handleSignIn = (event) => {
        setError('')
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        signIn(email, password)
            .then(result => {
                const user = result.user;
                //    console.log(user);
                event.target.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    return (
        <div className='loginForm'>
            <h2 className='formTitle'>Login </h2>
            <form onSubmit={handleSignIn}>
                <div className="form-container">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" placeholder='Email' required />
                </div>
                <div className="form-container">
                    <label htmlFor="">Password</label>
                    <input type={show ? "text" : "password"} name="password" placeholder='Password' required />
                </div>
                <p className='showpassword' onClick={() => setShow(!show)}><small>
                    {
                        show ? <spen>Hide Password</spen> : <span>Show password</span>
                    }
                </small></p>
                <p className='text-error'>{error}</p>
                <div className="form-container">
                    <button>Login</button>
                    <h3>New to Ema-john ? <Link to='/signUp'>Create New Account</Link></h3>

                </div>
                <div className="form-container">
                    <p>Continue with Google</p>

                </div>
            </form>
        </div>
    );
};

export default Login;