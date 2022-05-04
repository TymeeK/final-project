import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/LoggedOutComponents/Login';
import Register from './Components/LoggedOutComponents/Register';
import Feed from './Components/LoggedInComponents/Feed';
import Profile from './Components/LoggedInComponents/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
