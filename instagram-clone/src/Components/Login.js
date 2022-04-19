import React from 'react';
import '../Styling/Login.css';
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
            <main className='main-container'>
                <form className='field-container'>
                    <h1>Fakestagram</h1>

                    <div>
                        <label className='fieldlabel' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='inputfield'
                            type='text'
                            name='username'
                        />
                    </div>
                    <div>
                        <label className='fieldlabel' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='inputfield'
                            type='password'
                            name='password'
                        />
                    </div>
                    <div>
                        <button className='loginbutton'>Log in</button>
                    </div>
                    <div className='line'></div>
                    <div>
                        <button className='loginbutton' onClick={handleClick}>
                            Login with google
                        </button>
                    </div>
                    <div>
                        <button className='loginbutton' onClick={handleSignOut}>
                            Sign out of google
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
