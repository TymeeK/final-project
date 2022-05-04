import React from 'react';
import { MainContainer, LoginButton } from '../../Styling/Login.Style';
import FormField from './FormField';
import { getUser, signOutUser, signInWithGoogle } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    getUser();
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

    return (
        <div>
            <MainContainer>
                <FormField register={false}>
                    <div>
                        <LoginButton>Login</LoginButton>
                    </div>
                    <div>
                        <LoginButton onClick={handleRegister}>
                            Register
                        </LoginButton>
                    </div>
                    <div>
                        <LoginButton onClick={handleClick}>
                            Login with google
                        </LoginButton>
                    </div>

                    <div>
                        <LoginButton onClick={handleSignOut}>
                            Sign out of google
                        </LoginButton>
                    </div>
                </FormField>
            </MainContainer>
        </div>
    );
}
