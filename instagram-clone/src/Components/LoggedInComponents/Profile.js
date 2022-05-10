import React, { useState, useEffect } from 'react';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';
import {
    ProfileDiv,
    ProfilePic,
    ProfileName,
    ProfileLabel,
} from '../../Styling/Profile.Style';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../firebase-config';

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

        async function getDefaultPicture() {
            const listRef = ref(storage, 'default');

            const list = await listAll(listRef);
            const path = list.items[0]._location.path_;

            const imageRef = ref(storage, path);
            getDownloadURL(imageRef).then(url => {
                console.log(url);
                setImagePath(url);
            });
        }

        // function getFollowers() {
        //     const docRef = doc(db, '');
        // }
        getUser();
        getDefaultPicture();
    }, []);

    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <H1>{user}</H1>
            </NavBar>
            <ProfileDiv>
                <div>
                    <ProfilePic src={imagePath} alt='Placeholder' />
                    <ProfileName>{user}</ProfileName>
                    <div>
                        <ProfileLabel>Posts</ProfileLabel>
                        <ProfileLabel> Followers</ProfileLabel>
                        <ProfileLabel> Following</ProfileLabel>
                    </div>
                </div>
            </ProfileDiv>
        </>
    );
}
