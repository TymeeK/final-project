import React, { useState, useEffect } from 'react';
import { getUser, signOutUser } from '../../firebase-config';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Profile() {
    const [user, setUser] = useState();

    //Get user from firebase authentication;
    useEffect(() => {
        function getUser() {
            const auth = getAuth();
            const user = auth.currentUser;
            onAuthStateChanged(auth, user => {
                if (user) {
                    const userId = user.email;
                    setUser(userId);
                } else {
                    console.log('Logged out');
                }
            });
        }
        getUser();
    }, []);

    return (
        <NavBar>
            <H1>Fakestagram</H1>
            <H1>{user}</H1>
        </NavBar>
    );
}
