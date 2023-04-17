import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

export const PersonalListItem = () => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <HStack>
                <Avatar size={'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <HStack>
                        <Badge colorScheme="whatsapp" fontSize={'xs'}>
                            Canvas
                        </Badge>
                        <Text fontSize={'md'}>Jan Kowalski</Text>
                    </HStack>
                    <VStack alignItems={'baseline'} spacing={0}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            jkowalski@box.com
                        </Text>
                    </VStack>
                </VStack>
            </HStack>

            <Spacer />
            <IconButton aria-label="IconButton2" icon={<DeleteIcon />} variant={'ghost'} />
        </Flex>
    );
};
