import { Parallax } from 'react-parallax';
import { Parallax as ScrollParallax } from 'react-scroll-parallax';
import { PagesCarousel } from './PagesCarousel';

export const PagesSection = () => {
    return (
        <Parallax
            strength={500}
            bgImage={`https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/pexels-photo-12169032.png`}
            bgImageSizes={'cover'}
            bgImageStyle={{ objectFit: 'cover' }}
        >
            <ScrollParallax speed={-20}>
                <PagesCarousel />
            </ScrollParallax>
        </Parallax>
    );
};
