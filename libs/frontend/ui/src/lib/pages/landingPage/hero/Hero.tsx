import { useKmQuery, useMobileQuery } from '@box-fc/frontend/query';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCountUp } from 'use-count-up';
import { LoginButton } from '../LoginButton';

export const Hero = () => {
    const { isMobile } = useMobileQuery();
    const { kmQuery } = useKmQuery();

    const { value: totalKmCount } = useCountUp({
        isCounting: true,
        start: 0,
        end: kmQuery.data,
        duration: 3,
    });

    if (isMobile) {
        return (
            <Flex h={'100vh'} w={'100vw'} direction={'column'} justifyContent={'center'}>
                <Flex justifyContent="center">
                    <LoginButton />
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex h="100vh" w="100vw">
            <Flex
                position="absolute"
                h="50%"
                w="calc(50vh)"
                bgSize="contain"
                bgImg="https://box-fitness-challenge.s3.eu-west-2.amazonaws.com/runner.png"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            />
            <Flex w="50%" h="full" bgColor="gray.50" p={10}>
                <Flex direction="column" justifyContent={'center'}>
                    <Flex direction="column" lineHeight="1">
                        <Text color="customYellow.500" fontSize="200" as="b" letterSpacing="-20px">
                            MOVE
                        </Text>
                        <Flex>
                            <Text color="customBlue.500" fontSize="200" as="b" letterSpacing="-20px">
                                FOR
                            </Text>
                            <Flex w="full" p="48px">
                                <Flex direction="column" justifyContent="center" lineHeight="1">
                                    <Flex>
                                        <Text
                                            fontSize="24"
                                            color="gray.50"
                                            bgColor="customGreen.500"
                                            rounded="16px"
                                            p="3"
                                        >
                                            together we can make
                                        </Text>
                                    </Flex>
                                    <Flex w="full" justifyContent="flex-end" mt="-8px" ml="36px">
                                        <Text
                                            fontSize="24"
                                            color="gray.50"
                                            bgColor="customGreen.500"
                                            rounded="16px"
                                            p="3"
                                        >
                                            every step matter!
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Text color="customBlue.500" fontSize="200" as="b" letterSpacing="-20px">
                            UKRAINE
                        </Text>
                    </Flex>

                    <Flex>
                        <Text color="customBlue.500" fontSize="48" as="b">
                            OCTOBER 15-28, 2024
                        </Text>
                    </Flex>
                    <Flex>
                        <Text color="customBlue.500" fontSize="24" as="b">
                            Share your achievements at #move-for-ukraine
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                w="50%"
                h="full"
                direction="column"
                bgColor="customBlue.500"
                p={10}
                justifyContent="center"
                textAlign="center"
                fontSize="32"
                lineHeight="1.5"
                gap="12"
            >
                <Spacer />

                <Flex justifyContent="center">
                    <Flex h="" direction="column" textColor="gray.50">
                        <Text>Join our charity event to support Ukraine!</Text>
                        <Text>For every kilometer you walk, run, bike or</Text>
                        <Text>
                            move, Box.org will <b>donate $1</b> to help
                        </Text>
                        <Text>
                            rebuild lives with{' '}
                            <a href="https://superhumans.com/">
                                <u>superhumans.com</u>
                            </a>
                        </Text>
                    </Flex>
                </Flex>

                <Flex justifyContent="center">
                    <LoginButton />
                </Flex>

                <Spacer />

                <Flex direction="column" textColor="gray.50">
                    <Text>As of {dayjs().format('MMMM D')}, we’ve moved for</Text>
                    <Text fontSize="48" as="b">
                        {totalKmCount} km
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
