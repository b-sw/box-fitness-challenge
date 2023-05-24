import { Training, useTrainingsQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TrainingsTable } from '../dashboard/tables/recent-trainings/Trainings.table';

enum Listing {
    MINE = 'My trainings',
    ALL = 'All trainings',
}

export const TrainingsDashboard = () => {
    const { trainingsQuery } = useTrainingsQuery();
    const { user } = useAuthStore();
    const [myTrainings, setMyTrainings] = useState<Training[]>([]);
    const [listing, setListing] = useState<Listing>(Listing.MINE);

    useEffect(() => {
        setMyTrainings(trainingsQuery.data?.filter((training) => training.userId === user.id) ?? []);
    }, [trainingsQuery.data, user.id]);

    const pages = {
        [Listing.MINE]: <TrainingsTable trainings={myTrainings} />,
        [Listing.ALL]: <TrainingsTable trainings={trainingsQuery.data as Training[]} />,
    };

    const switchListing = () => {
        if (listing === Listing.MINE) {
            setListing(Listing.ALL);
        } else {
            setListing(Listing.MINE);
        }
    };

    return (
        <Flex direction={'column'} gap={5}>
            <Spacer />

            <Flex alignItems={'center'}>
                <Flex w={'30%'}>
                    <Spacer />
                    <IconButton
                        aria-label={'left'}
                        icon={<ArrowBackIcon />}
                        onClick={switchListing}
                        borderRadius={50}
                        size={'md'}
                    />
                </Flex>
                <Spacer />

                <Text fontSize={'4xl'} fontWeight={'bold'} color={'gray.50'}>
                    {listing}
                </Text>

                <Spacer />
                <Flex w={'30%'}>
                    <IconButton
                        aria-label={'left'}
                        icon={<ArrowForwardIcon />}
                        onClick={switchListing}
                        borderRadius={50}
                        size={'md'}
                    />
                    <Spacer />
                </Flex>
            </Flex>

            {pages[listing]}

            <Spacer />
        </Flex>
    );
};
