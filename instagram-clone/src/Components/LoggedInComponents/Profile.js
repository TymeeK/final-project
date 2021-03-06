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
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [imagePath, setImagePath] = useState();
    const [postNumber, setPostNumber] = useState();
    const [showFollowers, setShowFollowers] = useState(false);
    const [image, setImage] = useState();
    const [postImage, setPostImage] = useState();
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();

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
        async function getPosts() {
            const postRef = ref(storage, `/${user}/posts`);
            const list = await listAll(postRef);

            const docRef = doc(db, 'users', user);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                for (let i = docSnap.data().posts.length - 1; i >= 0; i--) {
                    console.log(docSnap.data().posts[i].name);
                    console.log(docSnap.data().posts[i].picUrl);
                    setPostList(posts => [
                        ...posts,
                        docSnap.data().posts[i].picUrl,
                    ]);
                }
            }
        }

        if (!user) {
            return;
        }
        getFollowers();
        getProfilePicture();
        getPosts();
    }, [user]);

    useEffect(() => {
        function uploadNewProfilePicture() {
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
        }
        uploadNewProfilePicture();
    }, [image]);

    useEffect(() => {
        function uploadNewPost() {
            const postRef = ref(storage, `/${user}/posts/${postImage.name}`);
            uploadBytes(postRef, postImage)
                .then(async snapshot => {
                    console.log(snapshot);
                    await updatePostList();
                })
                .catch(error => {
                    console.error(error);
                });
        }

        async function updatePostList() {
            const postRef = ref(storage, `/${user}/posts/`);
            const list = await listAll(postRef);
            for (let i = 0; i < list.items.length; i++) {
                if (postImage.name === list.items[i].name) {
                    const path = list.items[i]._location.path_;
                    const imageRef = ref(storage, path);

                    getDownloadURL(imageRef).then(async url => {
                        const docRef = doc(db, 'users', user);
                        await updateDoc(docRef, {
                            posts: arrayUnion({
                                name: postImage.name,
                                picUrl: url,
                            }),
                        });
                    });
                }
            }
        }
        if (!postImage) {
            return;
        }
        uploadNewPost();
    }, [postImage]);

    return (
        <>
            <NavBar>
                <H1
                    onClick={() => navigate('/feed')}
                    style={{ cursor: 'pointer' }}
                >
                    Fakestagram
                </H1>
                <ProfileUpload onClick={() => hiddenPostInput.current.click()}>
                    Upload image
                </ProfileUpload>
                <input
                    type='file'
                    style={{ display: 'none' }}
                    ref={hiddenPostInput}
                    onChange={event => setPostImage(event.target.files[0])}
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
                    {postList.map((element, id) => {
                        return (
                            <Post key={id}>
                                <PostImage src={element} alt='place' />
                            </Post>
                        );
                    })}
                </PostContainer>
            </ProfilePostContainer>
        </>
    );
}
