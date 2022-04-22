import React from 'react';
import { MainContainer, H1 } from '../Styling/Login.Style';

export default function Register() {
    return (
        <div>
            <MainContainer>
                <form action=''>
                    <H1>Fakestagram</H1>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='text' name='password' />
                    </div>
                    <div>
                        <label htmlFor='confirmpassword'>
                            Confirm Password
                        </label>
                        <input type='text' name='confirmpassword' />
                    </div>
                </form>
            </MainContainer>
        </div>
    );
}
