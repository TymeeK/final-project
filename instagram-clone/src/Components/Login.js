import React from 'react';
import {
    MainContainer,
    H1,
    FieldLabel,
    InputField,
    FormFieldContainer,
    LoginButton,
    Line,
} from '../Styling/Login.Style';
import { signIn, getUser, signOutUser } from '../firebase-config';

export default function Login() {
    getUser();
    function handleClick(e) {
        e.preventDefault();
        signIn();
    }

    function handleSignOut(e) {
        e.preventDefault();
        signOutUser();
    }
    return (
        <div>
            <MainContainer>
                <FormFieldContainer className='field-container'>
                    <H1>Fakestagram</H1>

                    <div>
                        <FieldLabel htmlFor='username'>Username</FieldLabel>
                        <InputField type='text' name='username' />
                    </div>
                    <div>
                        <FieldLabel htmlFor='password'>Password</FieldLabel>
                        <InputField type='password' name='password' />
                    </div>
                    <div>
                        <LoginButton>Log in</LoginButton>
                    </div>
                    <Line></Line>
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
                </FormFieldContainer>
            </MainContainer>
        </div>
    );
}
