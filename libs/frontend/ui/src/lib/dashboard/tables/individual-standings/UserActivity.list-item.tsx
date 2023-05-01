import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';
import { MdAssessment } from 'react-icons/md';

type Props = {
    userActivity: UserActivity;
    user: User;
    onClick: (activity: UserActivity) => void;
};

export const UserActivityListItem = ({ userActivity, user, onClick }: Props) => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <HStack width={'55%'}>
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
            <Flex gap={1} alignItems={'center'} width={'30%'}>
                <Text fontSize={'sm'} color={'gray.800'}>
                    Score:
                </Text>
                <Text fontSize={'sm'} fontWeight={'bold'}>
                    {userActivity.score}
                </Text>
            </Flex>

            <Spacer />

            <IconButton
                aria-label="IconButton1"
                icon={<MdAssessment />}
                variant={'ghost'}
                onClick={() => onClick(userActivity)}
            />
        </Flex>
    );
};
