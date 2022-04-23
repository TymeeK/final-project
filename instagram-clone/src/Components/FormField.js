import React from 'react';
import {
    FormFieldContainer,
    FieldLabel,
    InputField,
    H1,
    LoginButton,
    Line,
} from '../Styling/Login.Style';

export default function FormField(props) {
    return (
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
            {props.register ? (
                <>
                    <div>{props.children}</div>
                </>
            ) : (
                <>
                    <Line></Line>
                    <div>{props.children}</div>
                </>
            )}
        </FormFieldContainer>
    );
}
