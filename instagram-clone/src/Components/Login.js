import React from 'react';
import { MainContainer, LoginButton } from '../Styling/Login.Style';
import FormField from './FormField';
import { getUser, signOutUser, signInWithGoogle } from '../firebase-config';

export default function Login() {
    getUser();
    function handleClick(e) {
        e.preventDefault();
        signInWithGoogle();
    }

    function handleSignOut(e) {
        e.preventDefault();
        signOutUser();
    }

    return (
        <div>
            <MainContainer>
                <FormField register={false}>
                    <div>
                        <LoginButton>Login</LoginButton>
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
