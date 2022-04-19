import React from 'react';
import '../Styling/Login.css';

export default function Login() {
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
                        <button className='loginbutton'>
                            Login with google
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
