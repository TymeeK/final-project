import React, { useState, useEffect } from 'react';
import { H1 } from '../../Styling/Login.Style';
import {
    NavBar,
    ImageContainer,
    ImageDiv,
    FeedImage,
    PostContainer,
} from '../../Styling/Feed.Style';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function Feed() {
    //Show profile page
    const navigate = useNavigate();
    const [feedImages, setFeedImages] = useState([]);
    const [user, setUser] = useState();

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

        async function getDocuments() {
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach(doc => {
                const posts = doc.data().posts;
                posts.forEach(element => {
                    setFeedImages(images => [...images, element.picUrl]);
                });
            });
        }

        getUser();
        getDocuments();
    }, []);
    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <H1
                    onClick={() => navigate('/profile')}
                    style={{ cursor: 'pointer' }}
                >
                    {user}
                </H1>
            </NavBar>
            <ImageContainer>
                {feedImages.map((element, id) => {
                    return (
                        <PostContainer>
                            <div>
                                <label style={{ display: 'block' }}>
                                    {user} posted this
                                </label>
                            </div>
                            <ImageDiv key={id}>
                                <FeedImage src={element} alt='feedimage' />{' '}
                            </ImageDiv>
                        </PostContainer>
                    );
                })}
            </ImageContainer>
        </>
    );
}
