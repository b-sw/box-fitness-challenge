import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/app';

// axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.baseURL = 'https://api.moveforukraine.com/';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
