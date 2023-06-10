import { useMobileQuery } from '@box-fc/frontend/query';
import { Hero } from './hero/Hero';
import { PagesSection } from './pagesSection/PagesSection';
import { StatsSection } from './statsSection/StatsSection';

export const LandingPage = () => {
    const { isMobile } = useMobileQuery();

    return (
        <>
            <Hero />
            {!isMobile && (
                <>
                    <StatsSection />
                    <PagesSection />
                </>
            )}
        </>
    );
};
