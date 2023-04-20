import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app/app';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND ?? 'https://boxfc.bieda.it/';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
