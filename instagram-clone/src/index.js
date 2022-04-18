import App from './App';
import { createRoot } from 'react-dom/client';
import './Styling/index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab='home' />);
