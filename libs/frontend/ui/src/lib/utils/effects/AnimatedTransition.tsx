import { ScaleFade } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';

export const AnimatedTransition = () => {
    const location = useLocation();

    return (
        <ScaleFade initialScale={1} in={true} key={location.key}>
            <Outlet />
        </ScaleFade>
    );
};
