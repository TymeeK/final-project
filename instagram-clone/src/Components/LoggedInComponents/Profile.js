import React, { useState } from 'react';
import { NavBar } from '../../Styling/Feed.Style';
import { H1 } from '../../Styling/Login.Style';

export default function Profile() {
    const [user, setUser] = useState('placeholder');
    return (
        <NavBar>
            <H1>Fakestagram</H1>
            <H1>Username: {user}</H1>
        </NavBar>
    );
}
