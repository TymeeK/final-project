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
import { getDoc, doc } from 'firebase/firestore';

export default function Profile() {
    const [user, setUser] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [imagePath, setImagePath] = useState();
    const [postNumber, setPostNumber] = useState();
    const [showFollowers, setShowFollowers] = useState(false);

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

        getUser();
        getDefaultPicture();
    }, []);

    useEffect(() => {
        async function getFollowers() {
            const docRef = doc(db, 'users', user);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log('Document data:', docSnap.data());
                setFollowers(docSnap.data().followers);
                setFollowing(docSnap.data().following);
                setPostNumber(docSnap.data().posts.length);
                setShowFollowers(true);
            }
        }

        if (!user) {
            return;
        }
        getFollowers();
    }, [user]);

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
                    {showFollowers ? (
                        <div>
                            <ProfileLabel> {postNumber} Posts</ProfileLabel>
                            <ProfileLabel> {followers} Followers</ProfileLabel>
                            <ProfileLabel> {following} Following</ProfileLabel>
                        </div>
                    ) : (
                        <div>
                            <ProfileLabel>Posts</ProfileLabel>
                            <ProfileLabel> Followers</ProfileLabel>
                            <ProfileLabel> Following</ProfileLabel>
                        </div>
                    )}
                </div>
            </ProfileDiv>
        </>
    );
}
