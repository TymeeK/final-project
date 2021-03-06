import React from 'react';
import {
    FormFieldContainer,
    FieldLabel,
    InputField,
    H1,
    LoginButton,
    Line,
} from '../../Styling/Login.Style';
export default function FormField(props) {
    return (
        <FormFieldContainer className='field-container'>
            <H1>Fakestagram</H1>

            <div>
                <FieldLabel type='email' htmlFor='username'>
                    Email
                </FieldLabel>
                <InputField
                    type='email'
                    name='username'
                    onChange={props.handleChange}
                />
            </div>
            <div>
                {props.register ? (
                    <FieldLabel htmlFor='password'>
                        Password (6 chars or more)
                    </FieldLabel>
                ) : (
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                )}

                <InputField
                    type='password'
                    name='password'
                    onChange={props.handleChange}
                />
            </div>
            {props.wrongInput ? (
                <label>Incorrect username or password</label>
            ) : (
                ''
            )}
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
