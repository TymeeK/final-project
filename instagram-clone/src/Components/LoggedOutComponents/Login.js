import React, { useState } from 'react';
import { MainContainer, LoginButton } from '../../Styling/Login.Style';
import FormField from './FormField';
import {
    getUser,
    signOutUser,
    signInWithGoogle,
    signInUser,
} from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [wrongInput, setWrongInput] = useState(false);

    function handleUserInput(event) {
        event.preventDefault();

        event.target.name === 'username'
            ? setEmail(event.target.value)
            : setPassword(event.target.value);
    }

    function handleClick(event) {
        event.preventDefault();
        signInWithGoogle();
    }

    function handleSignOut(event) {
        event.preventDefault();
        signOutUser();
    }

    function handleRegister(event) {
        event.preventDefault();
        navigate('/register');
    }
    //username = tymee@gmail.com
    //password = asdf1234

    function handleSignIn(event) {
        event.preventDefault();
        if (!email || !password) {
            return;
        }
        signInUser(email, password);

        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/profile');
            } else {
                setWrongInput(true);
            }
        });
    }

    return (
        <div>
            <MainContainer>
                <FormField
                    register={false}
                    handleChange={handleUserInput}
                    wrongInput={wrongInput}
                >
                    <div>
                        <LoginButton onClick={handleSignIn}>Login</LoginButton>
                    </div>
                    <div>
                        <LoginButton onClick={handleRegister}>
                            Register
                        </LoginButton>
                    </div>
                    {/* <div>
                        <LoginButton onClick={handleClick}>
                            Login with google
                        </LoginButton>
                    </div> */}

                    <div>
                        <LoginButton onClick={handleSignOut}>
                            Sign out
                        </LoginButton>
                    </div>
                </FormField>
            </MainContainer>
        </div>
    );
}
