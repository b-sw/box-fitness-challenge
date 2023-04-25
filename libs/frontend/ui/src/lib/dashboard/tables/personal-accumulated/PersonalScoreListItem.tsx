import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';
import { MdAssessment } from 'react-icons/md';

type PersonalListItemProps = {
    personName: string;
};

export const PersonalScoreListItem = ({ personName }: PersonalListItemProps) => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <HStack width={'55%'}>
                <Avatar size={'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <HStack>
                        <Badge colorScheme="whatsapp" fontSize={'xs'}>
                            Canvas
                        </Badge>
                        <Text fontSize={'md'}>{personName}</Text>
                    </HStack>
                    <VStack alignItems={'baseline'} spacing={0}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            jkowalski@box.com
                        </Text>
                    </VStack>
                </VStack>
            </HStack>
            <Spacer />
            <Flex gap={1} alignItems={'center'} width={'30%'}>
                <Text fontSize={'sm'} color={'gray.800'}>
                    Total time:
                </Text>
                <Badge colorScheme={'facebook'} variant={'outline'}>
                    123h 45m
                </Badge>
            </Flex>
            <Spacer />
            <IconButton aria-label="IconButton1" icon={<MdAssessment />} variant={'ghost'} />
        </Flex>
    );
};
