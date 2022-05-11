import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';

export default configureStore(
    {
        reducer: {
            login: loginReducer,
        },
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
