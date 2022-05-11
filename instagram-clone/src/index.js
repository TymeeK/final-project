import App from './App';
import { createRoot } from 'react-dom/client';
import './Styling/index.css';
import { app } from './firebase-config';
import store from './Redux/Store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App tab='home' />
    </Provider>
);
