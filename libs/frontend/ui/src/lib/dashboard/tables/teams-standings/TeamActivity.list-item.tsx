import { TeamActivity } from '@box-fc/shared/types';
import { Badge, Flex, Spacer, Text } from '@chakra-ui/react';
import { ColonList } from '../../../utils/generic-components/ColonList';
import { ListItem } from '../../../utils/list-item/ListItem';

type Props = {
    teamActivity: TeamActivity;
    isMobile: boolean;
};

export const TeamActivityListItem = ({ teamActivity, isMobile }: Props) => {
    const scoreFieldsNames = (
        <>
            <Text fontSize={'sm'} color={'gray.800'}>
                Score:
            </Text>
            <Text fontSize={'sm'} color={'gray.800'}>
                Avg. Score:
            </Text>
        </>
    );

    const scoreFieldsValues = (
        <>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {teamActivity.score}
            </Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {teamActivity.meanScore}
            </Text>
        </>
    );

    return (
        <ListItem>
            <Flex w={['100%', '70%']}>
                {isMobile && <Spacer />}
                <Badge colorScheme="linkedin" fontSize={'md'} variant={'subtle'}>
                    {teamActivity.team}
                </Badge>
                <Spacer />
            </Flex>

            <ColonList
                xlWidth={'30%'}
                isMobile={isMobile}
                leftChildren={scoreFieldsNames}
                rightChildren={scoreFieldsValues}
            />

            {/*<Flex w={['100%', '20%']}>*/}
            {/*    <Spacer />*/}
            {/*    <IconButton aria-label="IconButton1" icon={<BsPeopleFill />} variant={'ghost'} disabled />*/}
            {/*    <Spacer />*/}
            {/*</Flex>*/}
        </ListItem>
    );
};
