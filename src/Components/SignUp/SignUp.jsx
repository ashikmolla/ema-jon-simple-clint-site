import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import './SignUp.css'
import { AuthContext } from '../../Provider/AutheProvider';

const SignUp = () => {
    const [error, setError] = useState();
    const { createUser } = useContext(AuthContext)
    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        setError('');
        if (password <= 7) {
            setError('Password must br 6 characters of length')
            return
        } else if (password !== confirm) {
            setError('your passwor did not match')
            return
        }
        // console.log(email, password, confirm)

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });


    }
    return (
        <div className='loginForm'>
            <h2 className='formTitle'>Sign Up </h2>
            <form onSubmit={handleSignup}>
                <div className="form-container">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" placeholder='Email' required />
                </div>
                <div className="form-container">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" placeholder='Password' required />
                </div>
                <div className="form-container">

                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirm" placeholder='Confirm Password' required />
                </div>
                <p className='text-error'>{error}</p>
                <div className="form-container">
                    <button>Login</button>
                    <h3>Already have an account?  <Link to='/login'>Sign</Link></h3>

                </div>

                <div className="form-container">
                    <p>Continue with Google</p>

                </div>
            </form>
        </div>
    );
};

export default SignUp;