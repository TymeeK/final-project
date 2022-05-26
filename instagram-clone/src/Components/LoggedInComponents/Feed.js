import React from 'react';
import { H1 } from '../../Styling/Login.Style';
import { NavBar, ImageContainer } from '../../Styling/Feed.Style';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
    //Show profile page
    const navigate = useNavigate();
    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <button
                    onClick={() => navigate('/profile')}
                    style={{ cursor: 'pointer' }}
                >
                    Profile
                </button>
            </NavBar>
            <ImageContainer>
                <div>
                    <img src='' alt='placeholder' />
                </div>
            </ImageContainer>
        </>
    );
}
