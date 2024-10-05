import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/app';

// axios.defaults.baseURL = 'https://tracelytics.toadres.pl/';
axios.defaults.baseURL = 'http://localhost:3333/';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
