import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';
import {
    ProfileDiv,
    ProfilePic,
    ProfileName,
    ProfileUpload,
    ProfilePostContainer,
    PostContainer,
    Post,
    PostImage,
} from '../../Styling/Profile.Style';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    ref,
    listAll,
    getDownloadURL,
    uploadBytes,
    deleteObject,
} from 'firebase/storage';
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
    const [postList, setPostList] = useState([]);

    const hiddenFileInput = useRef(null);
    const hiddenPostInput = useRef(null);

    function setProfilePicture(path) {
        if (path) {
            const imageRef = ref(storage, path);
            getDownloadURL(imageRef).then(url => {
                setImagePath(url);
            });
        }
    }
    async function getDefaultPicture() {
        const listRef = ref(storage, 'default');
        const list = await listAll(listRef);
        const path = list.items[0]._location.path_;
        const imageRef = ref(storage, path);
        getDownloadURL(imageRef).then(url => {
            setImagePath(url);
        });
    }
    async function getProfilePicture() {
        const listRef = ref(storage, `/${user}/profilepicture`);
        const list = await listAll(listRef);

        if (list.items.length === 0) {
            getDefaultPicture();
        } else {
            const path = list.items[0]._location.path_;
            setProfilePicture(path);
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

        getUser();
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
        getProfilePicture();
    }, [user]);

    useEffect(() => {
        const uploadNewProfilePicture = async () => {
            if (!image) {
                return;
            }

            const listRef = ref(storage, `/${user}/profilepicture/`);
            listAll(listRef).then(picture => {
                const path = picture.items[0]._location.path_;
                const deleteRef = ref(storage, path);
                deleteObject(deleteRef)
                    .then(() => {
                        console.log('file deleted successfully');
                    })
                    .catch(error => {
                        console.error(error);
                    });
                const profileRef = ref(
                    storage,
                    `/${user}/profilepicture/${image.name}`
                );
                uploadBytes(profileRef, image)
                    .then(snapshot => {
                        console.log(snapshot);
                        setProfilePicture(profileRef);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        };
        uploadNewProfilePicture();
    }, [image]);

    useEffect(() => {
        if (postList.length === 0) {
            return;
        }
        //Return to this
        const postRef = ref(storage, `/${user}/posts/`);
    }, [postList]);

    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <ProfileUpload onClick={() => hiddenPostInput.current.click()}>
                    Upload image
                </ProfileUpload>
                <input
                    type='file'
                    style={{ display: 'none' }}
                    ref={hiddenPostInput}
                    onChange={event =>
                        setPostList(postList => [
                            ...postList,
                            event.target.files[0],
                        ])
                    }
                />
            </NavBar>
            <ProfileDiv>
                <div>
                    <ProfilePic src={imagePath} alt='Placeholder' />
                    <ProfileUpload
                        onClick={() => hiddenFileInput.current.click()}
                    >
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
            <ProfilePostContainer>
                <PostContainer>
                    <Post>Test</Post>
                    <Post>Test</Post>
                    <Post>Test</Post>
                </PostContainer>
            </ProfilePostContainer>
        </>
    );
}
