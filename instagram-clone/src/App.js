import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/LoggedOutComponents/Login';
import Register from './Components/LoggedOutComponents/Register';
import Feed from './Components/LoggedInComponents/Feed';
import Profile from './Components/LoggedInComponents/Profile';
import { useSelector } from 'react-redux';

function App() {
    const login = useSelector(state => state.login.value);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/profile' element={<Profile />} />
                {/* <Route
                    path='/feed'
                    element={login ? <Feed /> : <Navigate to='/' replace />}
                />
                <Route
                    path='/profile'
                    element={login ? <Profile /> : <Navigate to='/' replace />}
                /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
