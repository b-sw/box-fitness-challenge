import { useMobileQuery } from '@box-fc/frontend/query';
import { Divider, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import 'react-device-frameset/dist/styles/marvel-devices.min.css';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { Parallax } from 'react-parallax';
import { Parallax as ScrollParallax } from 'react-scroll-parallax';
import 'react-slideshow-image/dist/styles.css';
import { LoginButton } from '../LoginButton';

export const Hero = () => {
    const { isMobile } = useMobileQuery();
    const { scrollYProgress } = useViewportScroll();

    return (
        <Parallax
            strength={500}
            bgImage={`https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/pexels-photo-7648078.jpeg`}
            bgImageSizes={'cover'}
            bgImageStyle={{ objectFit: 'cover' }}
        >
            <Flex h={'100vh'}>
                <Flex h={'100vh'} w={'100vw'} direction={'column'}>
                    <Flex w={'100%'} h={'60%'} alignItems={'flex-end'}>
                        <Spacer />
                        <ScrollParallax speed={-15}>
                            <Flex
                                direction={'column'}
                                w={['100%']}
                                align={'center'}
                                backgroundColor={'whiteAlpha.500'}
                                rounded={'full'}
                                gap={4}
                                p={4}
                            >
                                <Text fontSize={'2xl'} color={'gray.800'} fontFamily={'gotham'} lineHeight={1} px={10}>
                                    FITNESS CHALLENGE
                                </Text>

                                <Divider borderColor={'gray.800'} />

                                <LoginButton />
                            </Flex>
                        </ScrollParallax>
                        <Spacer />
                    </Flex>

                    <Flex w={'100%'} h={'40%'} alignItems={'flex-end'}>
                        <Spacer />
                        <ScrollParallax speed={-15}>
                            <Flex>
                                <Spacer />
                                <IconButton
                                    aria-label={'scroll down'}
                                    icon={<MdKeyboardDoubleArrowDown size={'50'} color={'#FFF'} />}
                                    variant={'ghost'}
                                    size={'lg'}
                                    _hover={{ backgroundColor: 'transparent' }}
                                    _active={{ backgroundColor: 'transparent' }}
                                    onClick={() => scrollYProgress.set(0.5)}
                                />
                                <Spacer />
                            </Flex>
                        </ScrollParallax>
                        <Spacer />
                    </Flex>
                </Flex>
            </Flex>
        </Parallax>
    );
};
