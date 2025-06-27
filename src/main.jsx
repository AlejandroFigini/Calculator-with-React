import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Bubbles } from './components/Bubbles';
import './index.css';

createRoot(document.getElementById('calculator')).render(<App />);
createRoot(document.getElementById('background')).render(<Bubbles />);
