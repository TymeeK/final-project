import React from 'react';
import '../Styling/Login.css';

export default function Login() {
    return (
        <div>
            <main class='main-container'>
                <div>
                    <h1>Instagram</h1>
                </div>
                <form>
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
