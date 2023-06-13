import { useMobileQuery } from '@box-fc/frontend/query';
import { Divider, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { Parallax } from 'react-parallax';
import { Parallax as ScrollParallax } from 'react-scroll-parallax';
import { scrollToPercentage } from '../../../utils/effects/scroll';
import { LoginButton } from '../LoginButton';

export const Hero = () => {
    const { isMobile } = useMobileQuery();

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
                                backgroundColor={'whiteAlpha.600'}
                                rounded={'full'}
                                gap={4}
                                p={4}
                            >
                                <Text fontSize={'2xl'} color={'gray.900'} fontWeight={'bold'} lineHeight={1} px={10}>
                                    FITNESS CHALLENGE
                                </Text>

                                <Divider borderColor={'gray.900'} />

                                <LoginButton />
                            </Flex>
                        </ScrollParallax>
                        <Spacer />
                    </Flex>

                    {!isMobile && (
                        <Flex w={'100%'} h={'40%'} alignItems={'flex-end'}>
                            <Spacer />
                            <ScrollParallax speed={-15}>
                                <Flex>
                                    <Spacer />
                                    <IconButton
                                        as={motion.div}
                                        whileHover={{ bottom: 5 }}
                                        aria-label={'scroll down'}
                                        icon={<MdKeyboardDoubleArrowDown size={'50'} color={'#FFF'} />}
                                        variant={'ghost'}
                                        size={'lg'}
                                        _hover={{ backgroundColor: 'transparent' }}
                                        _active={{ backgroundColor: 'transparent' }}
                                        onClick={() => scrollToPercentage(0.5)}
                                    />
                                    <Spacer />
                                </Flex>
                            </ScrollParallax>
                            <Spacer />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Parallax>
    );
};
