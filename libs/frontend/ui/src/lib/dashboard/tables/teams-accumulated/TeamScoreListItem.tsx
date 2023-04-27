import { Badge, Flex, Spacer, Text } from '@chakra-ui/react';

type PersonalListItemProps = {
    personName: string;
};

export const TeamScoreListItem = ({ personName }: PersonalListItemProps) => {
    const teamMembersButtonVariants = {
        hidden: { x: -30, opacity: 0, transition: { ease: 'easeOut', duration: 0.2 } },
        hover: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.2 } },
    };

    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            <Badge colorScheme="whatsapp" fontSize={'xl'}>
                Canvas
            </Badge>

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
        </Flex>
    );
};
