import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const sliderProps = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export const PagesCarousel = () => {
    const [slider, setSlider] = React.useState<Slider | null>(null);

    const cards = [
        {
            heading: 'Reliability',
            shortText: 'Instant registration.',
            text: 'Be ahead of everyone by tracking the progress live and ensure that everything is right.',
            img: 'https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/Screenshot+2023-06-10+at+12.05.23.png',
        },
        {
            heading: 'Scalability',
            shortText: 'Grow bigger with us.',
            text: 'Manage all stats in one place. Assign teams, count scores and more.',
            img: 'https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/Screenshot+2023-06-10+at+12.05.32.png',
        },
        {
            heading: 'Ease of use',
            shortText: 'Convenient interface.',
            text: `Check trainings. Search person. Don't waste time.`,
            img: 'https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/Screenshot+2023-06-10+at+12.05.50.png',
        },
    ];

    return (
        <Flex p={4} h={'100vh'} align={'center'} direction={'row'} overflow={'hidden'}>
            <IconButton
                rounded={'full'}
                aria-label={'left-arrow'}
                variant={'ghost'}
                icon={<ArrowBackIcon />}
                onClick={() => slider?.slickPrev()}
                size={'lg'}
            />

            <Flex overflow={'hidden'} direction={'column'}>
                <Slider {...sliderProps} ref={(slider) => setSlider(slider)}>
                    {cards.map((card, index) => (
                        <Flex key={index}>
                            <Flex direction={'row'} p={20} gap={20}>
                                <Flex w={'60%'}>
                                    <Image shadow={'md'} src={card.img} borderRadius={20} />
                                </Flex>

                                <Flex direction={'column'} w={'50%'}>
                                    <Flex h={'45%'} alignItems={'flex-end'}>
                                        <Parallax speed={-5}>
                                            <Heading fontSize={'5xl'}>{card.heading}</Heading>
                                        </Parallax>
                                    </Flex>

                                    <Parallax speed={-5}>
                                        <Flex direction={'column'}>
                                            <Text fontSize={'2xl'} fontWeight={'light'}>
                                                {card.shortText}
                                            </Text>

                                            <Text fontSize={'2xl'} opacity={0.6} fontWeight={'light'}>
                                                {card.text}
                                            </Text>

                                            <Spacer />
                                        </Flex>
                                    </Parallax>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Slider>
                <Spacer />
            </Flex>

            <IconButton
                rounded={'full'}
                aria-label={'right-arrow'}
                variant={'ghost'}
                icon={<ArrowForwardIcon />}
                onClick={() => slider?.slickNext()}
                size={'lg'}
            />
        </Flex>
    );
};
