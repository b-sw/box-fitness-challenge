import { Box, Fade, Flex, Heading, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useCountUp } from 'use-count-up';

const REGISTERED_TRAININGS = 543;
const UNIQUE_PARTICIPANTS = 99;
const TRAINED_HOURS = 748;

export const StatsSection = () => {
    const { scrollYProgress } = useViewportScroll();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [countStarted, setCountStarted] = useState(false);

    scrollYProgress.onChange(setScrollProgress);

    const { value: leaguesCount } = useCountUp({
        isCounting: countStarted,
        start: 0,
        end: REGISTERED_TRAININGS,
        duration: 3,
    });

    const { value: countriesCount } = useCountUp({
        isCounting: countStarted,
        start: 0,
        end: UNIQUE_PARTICIPANTS,
        duration: 3,
    });

    const { value: gradesCount } = useCountUp({
        isCounting: countStarted,
        start: 0,
        end: TRAINED_HOURS,
        duration: 3,
    });

    useEffect(() => {
        if (scrollProgress > 0.25 && !countStarted) {
            setCountStarted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollProgress]);

    return (
        <Flex p={4} h={'100vh'} direction={'column'} align={'center'} backgroundColor={'gray.400'}>
            <Spacer />
            <Parallax speed={-10}>
                <Heading fontSize={'7xl'} color={'gray.50'} mb={10} fontFamily={'gotham'}>
                    Our scale
                </Heading>
            </Parallax>

            <SimpleGrid columns={[1, 3]} spacing={'100'}>
                <Parallax speed={-15}>
                    <Box>
                        <Fade in={countStarted}>
                            <Heading fontSize={'8xl'}>{leaguesCount}</Heading>
                        </Fade>
                        <Text fontSize={'4xl'} fontFamily={'gotham'}>
                            Registered trainings
                        </Text>
                    </Box>
                </Parallax>

                <Parallax speed={-15}>
                    <Box>
                        <Fade in={countStarted}>
                            <Heading fontSize={'8xl'}>{countriesCount}</Heading>
                        </Fade>
                        <Text fontSize={'4xl'} fontFamily={'gotham'}>
                            Unique participants
                        </Text>
                    </Box>
                </Parallax>

                <Parallax speed={-15}>
                    <Box>
                        <Fade in={countStarted}>
                            <Heading fontSize={'8xl'}>{gradesCount}</Heading>
                        </Fade>
                        <Text fontSize={'4xl'} fontFamily={'gotham'}>
                            Trained hours
                        </Text>
                    </Box>
                </Parallax>
            </SimpleGrid>

            <Spacer />
        </Flex>
    );
};
