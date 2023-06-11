import { Box, Fade, Flex, Heading, IconButton, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { Parallax, Parallax as ScrollParallax } from 'react-scroll-parallax';
import { useCountUp } from 'use-count-up';
import { scrollToPercentage } from '../../../utils/effects/scroll';

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

            <Flex h={'60%'} direction={'column'}>
                <Spacer />

                <Flex direction={'column'}>
                    <Flex>
                        <Spacer />

                        <Parallax speed={-10}>
                            <Heading fontSize={'7xl'} color={'gray.50'} mb={10}>
                                Our scale
                            </Heading>
                        </Parallax>

                        <Spacer />
                    </Flex>

                    <SimpleGrid columns={[1, 3]} spacing={'100'}>
                        <Parallax speed={-15}>
                            <Box>
                                <Fade in={countStarted}>
                                    <Heading fontSize={'8xl'}>{leaguesCount}</Heading>
                                </Fade>
                                <Text fontSize={'4xl'}>Registered trainings</Text>
                            </Box>
                        </Parallax>

                        <Parallax speed={-15}>
                            <Box>
                                <Fade in={countStarted}>
                                    <Heading fontSize={'8xl'}>{countriesCount}</Heading>
                                </Fade>
                                <Text fontSize={'4xl'}>Unique participants</Text>
                            </Box>
                        </Parallax>

                        <Parallax speed={-15}>
                            <Box>
                                <Fade in={countStarted}>
                                    <Heading fontSize={'8xl'}>{gradesCount}</Heading>
                                </Fade>
                                <Text fontSize={'4xl'}>Trained hours</Text>
                            </Box>
                        </Parallax>
                    </SimpleGrid>
                </Flex>
            </Flex>

            <Flex w={'100%'} h={'40%'} alignItems={'flex-end'}>
                <Spacer />
                <ScrollParallax speed={-15}>
                    <Flex>
                        <Spacer />
                        <IconButton
                            as={motion.div}
                            whileHover={{ bottom: 5 }}
                            aria-label={'scroll down'}
                            icon={<MdKeyboardDoubleArrowDown size={'50'} color={'#1a202c'} />}
                            variant={'ghost'}
                            size={'lg'}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            onClick={() => scrollToPercentage(1)}
                        />
                        <Spacer />
                    </Flex>
                </ScrollParallax>
                <Spacer />
            </Flex>
        </Flex>
    );
};
