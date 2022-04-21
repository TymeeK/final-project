import React from 'react';
import { MainContainer } from '../Styling/Login.Style';

export default function Register() {
    return (
        <div>
            <MainContainer>
                <form action=''>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' />
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' />
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input type='text' name='confirmpassword' />
                </form>
            </MainContainer>
        </div>
    );
}
