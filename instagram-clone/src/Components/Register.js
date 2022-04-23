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
    return (
        <div>
            <MainContainer>
                <FormField register={true}>
                    <div>
                        <FieldLabel htmlFor='confirmpassword'>
                            Confirm Password
                        </FieldLabel>
                        <InputField type='text' name='confirmpassword' />
                    </div>
                    <LoginButton>Sign up</LoginButton>
                </FormField>
            </MainContainer>
        </div>
    );
}
