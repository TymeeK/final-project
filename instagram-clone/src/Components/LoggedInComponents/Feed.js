import React from 'react';
import { H1 } from '../../Styling/Login.Style';
import { HeadingDiv, NavBar } from '../../Styling/Feed.Style';

export default function Feed() {
    return (
        <>
            <NavBar>
                <H1>Fakestagram</H1>
                <input type='text' />
                <button>Profile</button>
            </NavBar>
            <div></div>
        </>
    );
}
