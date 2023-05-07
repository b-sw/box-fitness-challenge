import { useEffect, useState } from 'react';

export const useMobileQuery = () => {
    const MOBILE_WINDOW_WIDTH = 768;
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WINDOW_WIDTH);

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < MOBILE_WINDOW_WIDTH));
    }, []);

    return { isMobile };
};
