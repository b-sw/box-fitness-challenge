import { ActivityQueryType } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

type PersonalListItemProps = {
    activity: ActivityQueryType;
    user: User;
};

export const PersonalActivityListItem = ({ activity, user }: PersonalListItemProps) => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <HStack width={'50%'}>
                <Avatar size={'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <HStack>
                        <Badge colorScheme="whatsapp" fontSize={'xs'}>
                            {user.team}
                        </Badge>
                        <Text fontSize={'md'}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </HStack>
                    <VStack alignItems={'baseline'} spacing={0}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            {user.email}
                        </Text>
                    </VStack>
                </VStack>
            </HStack>

            <Spacer />

            <Flex w={'40%'} gap={1}>
                <Flex direction={'column'} alignItems={'flex-end'}>
                    <Text fontSize={'sm'} color={'gray.800'}>
                        Time:
                    </Text>
                    <Text fontSize={'sm'} color={'gray.800'}>
                        Activity:
                    </Text>
                </Flex>

                <Flex direction={'column'} alignItems={'flex-start'} gap={1}>
                    <Badge colorScheme={'facebook'} variant={'outline'}>
                        {activity.duration / 60}h {activity.duration % 60}m
                    </Badge>
                    <Badge colorScheme={'facebook'} variant={'outline'}>
                        {activity.type}
                    </Badge>
                </Flex>
            </Flex>

            <Spacer />

            <Flex>
                <IconButton aria-label="IconButton2" icon={<DeleteIcon />} variant={'ghost'} />
            </Flex>
        </Flex>
    );
};
