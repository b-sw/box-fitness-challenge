import { Path } from '@box-fc/frontend/domain';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const statusCode: StatusCodes = error.response ? error.response.status : null;

                if (statusCode !== StatusCodes.UNAUTHORIZED) {
                    return;
                }

                navigate(Path.LANDING_PAGE, { state: { customMessage: 'You have been logged out.' } });
            },
        );
    }, []);

    return null;
};
