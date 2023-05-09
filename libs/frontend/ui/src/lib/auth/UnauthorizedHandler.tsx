import { Path } from '@box-fc/frontend/domain';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const statusCode: StatusCodes | null = error.response ? error.response.status : null;
                const errorMessage: string = error.response ? (error.response.data as any).message : 'Error';

                if (statusCode === StatusCodes.UNAUTHORIZED) {
                    navigate(Path.LANDING_PAGE, { state: { customMessage: 'You have been logged out.' } });
                }

                return Promise.reject(new Error(errorMessage));
            },
        );
    }, []);

    return null;
};
