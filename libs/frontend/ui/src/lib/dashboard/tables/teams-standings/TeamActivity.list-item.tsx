import { TeamActivity } from '@box-fc/shared/types';
import { Badge, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { BsPeopleFill } from 'react-icons/bs';

type Props = {
    teamActivity: TeamActivity;
};

export const TeamActivityListItem = ({ teamActivity }: Props) => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <Badge colorScheme="whatsapp" fontSize={'xl'}>
                {teamActivity.team}
            </Badge>

            <Spacer />

            <Flex gap={1} alignItems={'center'} width={'30%'}>
                <Text fontSize={'sm'} color={'gray.800'}>
                    Score:
                </Text>
                <Text fontSize={'sm'} fontWeight={'bold'}>
                    {teamActivity.score}
                </Text>
            </Flex>

            <Spacer />

            <Flex width={'15%'}>
                <IconButton aria-label="IconButton1" icon={<BsPeopleFill />} variant={'ghost'} disabled />
            </Flex>
        </Flex>
    );
};
