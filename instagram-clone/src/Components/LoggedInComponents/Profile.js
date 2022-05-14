import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';
import {
    ProfileDiv,
    ProfilePic,
    ProfileName,
    ProfileUpload,
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
    const hiddenFileInput = useRef(null);

    async function getProfilePicture() {
        const listRef = ref(storage, `/${user}/profilepicture`);
        const list = await listAll(listRef);
        if (list.items.length == 0) {
            return false;
        } else {
            const path = list.items[0]._location.path_;
            return path;
        }
    }

    async function setProfilePicture() {
        const path = await getProfilePicture();
        if (path) {
            const imageRef = ref(storage, path);
            getDownloadURL(imageRef).then(url => {
                setImagePath(url);
            });
        }
    }

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
            const imageExists = await getProfilePicture();
            if (imageExists) {
                setProfilePicture();
                return;
            }
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
        // getDefaultPicture();
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
        setProfilePicture();
    }, [user]);

    useEffect(() => {
        const uploadNewProfilePicture = () => {
            if (!image) {
                return;
            }

            const profileRef = ref(
                storage,
                `/${user}/profilepicture/${image.name}`
            );
            uploadBytes(profileRef, image).then(snapshot => {
                console.log('Uploaded a blob or file!');
                setProfilePicture();
            });
        };
        uploadNewProfilePicture();
    }, [image]);

    function handleClick() {
        hiddenFileInput.current.click();
    }

    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <H1>{user}</H1>
            </NavBar>
            <ProfileDiv>
                <div>
                    <ProfilePic src={imagePath} alt='Placeholder' />
                    <ProfileUpload onClick={handleClick}>
                        Upload new profile picture
                    </ProfileUpload>
                    <input
                        type='file'
                        onChange={event => setImage(event.target.files[0])}
                        style={{ display: 'none' }}
                        ref={hiddenFileInput}
                    />
                    <ProfileName>{user}</ProfileName>
                    {showFollowers ? (
                        <div>
                            <label> {postNumber} Posts</label>
                            <label> {followers} Followers</label>
                            <label> {following} Following</label>
                        </div>
                    ) : (
                        <div>
                            <label>Posts</label>
                            <label> Followers</label>
                            <label> Following</label>
                        </div>
                    )}
                </div>
            </ProfileDiv>
        </>
    );
}
