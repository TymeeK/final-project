import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/LoggedOutComponents/Login';
import Register from './Components/LoggedOutComponents/Register';
import Feed from './Components/LoggedInComponents/Feed';
import Profile from './Components/LoggedInComponents/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from './Redux/LoginSlice';

function App() {
    const login = useSelector(state => state.login.value);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/feed' element={<Feed />} />
                <Route
                    path='/profile'
                    element={login ? <Profile /> : <Navigate to='/' replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
