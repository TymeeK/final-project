import React, { useState } from 'react';
import {
    MainContainer,
    H1,
    FieldLabel,
    InputField,
    LoginButton,
} from '../../Styling/Login.Style';
import FormField from './FormField';
import {
    createUser,
    getUser,
    signInUser,
    signOutUser,
} from '../../firebase-config';
import { RequirementLabel } from '../../Styling/Register.Style';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showRequirements, setShowRequirements] = useState(false);
    const navigate = useNavigate();

    function handleChange(event) {
        event.preventDefault();

        if (event.target.name === 'username') {
            setEmail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        } else {
            setConfirmPassword(event.target.value);
        }
    }

    function handleSignUp(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setShowRequirements(true);
        } else {
            navigate('/feed');
            createUser(email, password);
            signInUser(email, password);
        }
    }

    return (
        <div>
            <MainContainer>
                <FormField register={true} handleChange={handleChange}>
                    <div>
                        <FieldLabel htmlFor='confirmpassword'>
                            Confirm Password
                        </FieldLabel>
                        <InputField
                            type='password'
                            name='confirmpassword'
                            onChange={handleChange}
                        />
                        {showRequirements ? (
                            <RequirementLabel>
                                Passwords do not match
                            </RequirementLabel>
                        ) : (
                            ''
                        )}
                    </div>
                    <LoginButton onClick={handleSignUp}>Sign up</LoginButton>
                </FormField>
            </MainContainer>
        </div>
    );
}
