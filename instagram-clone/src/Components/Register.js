import React from 'react';
import {
    MainContainer,
    H1,
    FieldLabel,
    InputField,
    LoginButton,
} from '../Styling/Login.Style';
import FormField from './FormField';

export default function Register() {
    function handleChange(event) {
        event.preventDefault();
    }
    function handleSignUp(event) {
        event.preventDefault();
    }

    return (
        <div>
            <MainContainer>
                <FormField register={true}>
                    <div>
                        <FieldLabel htmlFor='confirmpassword'>
                            Confirm Password
                        </FieldLabel>
                        <InputField type='password' name='confirmpassword' />
                    </div>
                    <LoginButton onClick={handleSignUp}>Sign up</LoginButton>
                </FormField>
            </MainContainer>
        </div>
    );
}
