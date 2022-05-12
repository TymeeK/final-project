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
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage, db } from '../../firebase-config';
import { getDoc, doc } from 'firebase/firestore';

export default function Profile() {
    const [user, setUser] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [imagePath, setImagePath] = useState();
    const [postNumber, setPostNumber] = useState();
    const [showFollowers, setShowFollowers] = useState(false);
    const [image, setImage] = useState();

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

    useEffect(() => {
        const upload = () => {
            if (!image) {
                return;
            }
            const profileRef = ref(
                storage,
                `/${user}/profilepicture/${image.name}`
            );
            uploadBytes(profileRef, image).then(snapshot => {
                console.log('Uploaded a blob or file!');
            });
        };
        upload();
    }, [image]);

    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <H1>{user}</H1>
            </NavBar>
            <ProfileDiv>
                <div>
                    <ProfilePic src={imagePath} alt='Placeholder' />
                    <input
                        type='file'
                        onChange={e => setImage(e.target.files[0])}
                    />
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
