import { Week } from '@box-fc/frontend/domain';
import { Avatar, Flex, Progress, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { TablePanel } from '../utils/table-panel/TablePanel';

type Props = {
    week: Week;
};

export const WinnersTable = ({ week }: Props) => {
    const individualScore = (points: number, color: string) => (
        <Flex w={'100%'} direction={'column'}>
            <Tooltip label={`score: ${points}`}>
                <Flex position={'relative'} w={'100%'} h={'48px'} alignItems={'center'}>
                    <Progress
                        value={points}
                        max={150}
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
                            {points}
                        </Text>
                        <Spacer />
                    </Flex>
                </Flex>
            </Tooltip>
        </Flex>
    );

    return (
        <TablePanel>
            <Spacer />

            <Flex w={'100%'} h={'100%'}>
                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex w={'80%'} direction={'column'} gap={5}>
                        <Flex>
                            <Avatar size={'full'} border={'5px solid #c0c0c0'} shadow={'md'} />
                        </Flex>
                        {individualScore(123, 'silver')}
                    </Flex>

                    <Spacer />
                </Flex>

                <Spacer />

                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex direction={'column'} gap={5}>
                        <Flex>
                            <Avatar size={'full'} border={'5px solid #FFD700'} shadow={'md'} />
                        </Flex>
                        {individualScore(150, 'gold')}
                    </Flex>

                    <Spacer />
                </Flex>

                <Spacer />

                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <Flex w={'70%'} direction={'column'} gap={5}>
                        <Flex>
                            <Avatar size={'full'} border={'5px solid #cd7f32'} shadow={'md'} />
                        </Flex>
                        {individualScore(10, 'bronze')}
                    </Flex>

                    <Spacer />
                </Flex>
            </Flex>

            <Spacer />
        </TablePanel>
    );
};
