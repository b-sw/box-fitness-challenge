import { PodiumPlace } from '@box-fc/frontend/domain';
import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Flex, Progress, SkeletonCircle, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { TablePanel } from '../utils/table-panel/TablePanel';

type Props = {
    winners: Partial<Record<PodiumPlace, User & UserActivity>>;
    isLoading: boolean;
    onClick?: (podiumPlace: PodiumPlace) => void;
};

export const WinnersTable = ({ winners, isLoading, onClick }: Props) => {
    const winner = winners[PodiumPlace.First];
    const runnerUp = winners[PodiumPlace.Second];
    const thirdPlace = winners[PodiumPlace.Third];

    const avatarSize = {
        [PodiumPlace.First]: '240px',
        [PodiumPlace.Second]: '190px',
        [PodiumPlace.Third]: '165px',
    };

    const individualScore = (points: number, color: string, tbd?: boolean) => (
        <Flex w={'100%'} direction={'column'}>
            <Tooltip label={`score: ${points}`}>
                <Flex position={'relative'} w={'100%'} h={'48px'} alignItems={'center'}>
                    {isLoading ? (
                        <Progress
                            w={'100%'}
                            h={'100%'}
                            rounded={'full'}
                            bgColor={'gray.300'}
                            colorScheme={color}
                            position={'absolute'}
                            hasStripe={true}
                            shadow={'md'}
                            isIndeterminate
                        ></Progress>
                    ) : (
                        <>
                            <Progress
                                value={points}
                                max={winner?.score || points}
                                w={'100%'}
                                h={'100%'}
                                rounded={'full'}
                                bgColor={'gray.300'}
                                colorScheme={color}
                                position={'absolute'}
                                hasStripe={true}
                                shadow={'md'}
                            ></Progress>
                            <Flex zIndex={999} w={'100%'}>
                                <Spacer />
                                <Text borderColor={'gray.900'} fontSize={'2xl'} textColor={'gray.700'} size={'48px'}>
                                    {tbd ? 'TBD' : points}
                                </Text>
                                <Spacer />
                            </Flex>
                        </>
                    )}
                </Flex>
            </Tooltip>
        </Flex>
    );

    const avatar = (user: (User & UserActivity) | undefined, podiumPlace: PodiumPlace, borderColor: string) => {
        if (isLoading) {
            return (
                <SkeletonCircle
                    size={'full'}
                    shadow={'md'}
                    style={{
                        width: avatarSize[podiumPlace],
                        height: avatarSize[podiumPlace],
                    }}
                />
            );
        }

        return (
            <Tooltip label={`${user ? user.firstName + ' ' + user.lastName : 'TBD'}`}>
                <Avatar
                    size={'full'}
                    border={`5px solid ${borderColor}`}
                    shadow={'md'}
                    src={user?.imageUrl}
                    onClick={() => onClick?.(podiumPlace)}
                    _hover={{
                        cursor: onClick && 'pointer',
                        opacity: onClick && 0.8,
                    }}
                    _active={{
                        opacity: onClick && 0.9,
                    }}
                    style={{
                        width: avatarSize[podiumPlace],
                        height: avatarSize[podiumPlace],
                    }}
                />
            </Tooltip>
        );
    };

    return (
        <TablePanel>
            <Spacer />

            <Flex w={'100%'} h={'100%'}>
                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex w={'80%'} direction={'column'} gap={5} alignItems={'center'}>
                        <Flex>{avatar(runnerUp, PodiumPlace.Second, '#c0c0c0')}</Flex>
                        {individualScore(runnerUp?.score || 0, 'silver', !runnerUp)}
                    </Flex>

                    <Spacer />
                </Flex>

                <Spacer />

                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex direction={'column'} gap={5} alignItems={'center'}>
                        <Flex>{avatar(winner, PodiumPlace.First, '#FFD700')}</Flex>
                        {individualScore(winner?.score || 0, 'gold', !winner)}
                    </Flex>

                    <Spacer />
                </Flex>

                <Spacer />

                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex w={'70%'} direction={'column'} gap={5} alignItems={'center'}>
                        <Flex>{avatar(thirdPlace, PodiumPlace.Third, '#cd7f32')}</Flex>
                        {individualScore(thirdPlace?.score || 0, 'bronze', !thirdPlace)}
                    </Flex>

                    <Spacer />
                </Flex>
            </Flex>

            <Spacer />
        </TablePanel>
    );
};
