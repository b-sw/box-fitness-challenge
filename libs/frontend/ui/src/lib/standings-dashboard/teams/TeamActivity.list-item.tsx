import { TeamActivity } from '@box-fc/shared/types';
import { Badge, Flex, Progress, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { HeightRegulator } from '../../utils/generic-components/HeightRegulator';
import { ListItem } from '../../utils/list-item/ListItem';

type Props = {
    teamActivity: TeamActivity;
    maxScore: number;
    maxAverageMemberScore: number;
};

export const TeamActivityListItem = ({ teamActivity, maxScore, maxAverageMemberScore }: Props) => {
    return (
        <ListItem>
            <HeightRegulator />
            <Flex w={'50%'}>
                <Badge
                    fontSize={'15'}
                    fontWeight={'italic'}
                    textColor={'boxBlue.500'}
                    backgroundColor={'blue.50'}
                    border={'1px'}
                    borderRadius={15}
                >
                    <Text px={1}>{teamActivity.team ?? 'N/A team'}</Text>
                </Badge>
            </Flex>

            <Flex w={'50%'} direction={'column'} gap={1}>
                <Tooltip label={`average member score: ${teamActivity.meanScore}`}>
                    <Flex position={'relative'} w={'100%'} alignItems={'center'}>
                        <Progress
                            value={teamActivity.meanScore}
                            max={maxAverageMemberScore}
                            w={'100%'}
                            h={'100%'}
                            rounded={'full'}
                            bgColor={'gray.300'}
                            colorScheme={'boxBlue'}
                            position={'absolute'}
                            hasStripe={true}
                        ></Progress>
                        <Flex zIndex={999} w={'100%'}>
                            <Spacer />
                            <Text
                                borderColor={'gray.900'}
                                textShadow={'-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}
                                textColor={'gray.50'}
                            >
                                {teamActivity.meanScore}
                            </Text>
                            <Spacer />
                        </Flex>
                    </Flex>
                </Tooltip>

                <Tooltip label={`total score: ${teamActivity.score}`}>
                    <Flex position={'relative'} w={'100%'} alignItems={'center'}>
                        <Progress
                            value={teamActivity.score}
                            max={maxScore}
                            w={'100%'}
                            h={'100%'}
                            rounded={'full'}
                            bgColor={'gray.300'}
                            colorScheme={'boxBlue'}
                            position={'absolute'}
                        ></Progress>
                        <Flex zIndex={999} w={'100%'}>
                            <Spacer />
                            <Text
                                borderColor={'gray.900'}
                                textShadow={'-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}
                                textColor={'gray.50'}
                            >
                                {teamActivity.score}
                            </Text>
                            <Spacer />
                        </Flex>
                    </Flex>
                </Tooltip>
            </Flex>
        </ListItem>
    );
};
