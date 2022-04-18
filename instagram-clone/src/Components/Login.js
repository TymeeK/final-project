import React from 'react';
import '../Styling/Login.css';

export default function Login() {
    return (
        <div>
            <main className='main-container'>
                <form className='field-container'>
                    <h1>Fakestagram</h1>

                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' />
                    </div>
                </form>
            </main>
        </div>
    );
}
