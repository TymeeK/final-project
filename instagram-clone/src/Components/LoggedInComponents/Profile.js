import React, { useState, useEffect } from 'react';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';
import { ProfileDiv } from '../../Styling/Profile.Style';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';

export default function Profile() {
    const [user, setUser] = useState();
    const [imagePath, setImagePath] = useState();

    //Get user from firebase authentication;
    useEffect(() => {
        function getUser() {
            const auth = getAuth();
            onAuthStateChanged(auth, user => {
                if (user) {
                    const userId = user.email;
                    setUser(userId);
                } else {
                    console.log('Logged out');
                }
            });
        }

        async function listAllFiles() {
            const listRef = ref(storage, 'images');

            const list = await listAll(listRef);
            const path = list.items[0]._location.path_;

            const imageRef = ref(storage, path);
            getDownloadURL(imageRef).then(url => {
                console.log(url);
                setImagePath(url);
            });
        }
        getUser();
        listAllFiles();
    }, []);

    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <H1>{user}</H1>
            </NavBar>
            <ProfileDiv>
                test
                <img src={imagePath} alt='Placeholder' />
            </ProfileDiv>
        </>
    );
}
