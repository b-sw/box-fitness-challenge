import { Training, useTrainingsQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { ListingSwitcher } from '../utils/generic-components/ListingSwitcher';
import { TrainingsTable } from './Trainings.table';

enum Listing {
    MINE = 'My activities',
    ALL = 'Boxers activities',
}

export const TrainingsDashboard = () => {
    const { trainingsQuery } = useTrainingsQuery();
    const { user } = useAuthStore();
    const [myTrainings, setMyTrainings] = useState<Training[]>([]);
    const [activeListing, setActiveListing] = useState<Listing>(Listing.MINE);

    useEffect(() => {
        const actualTrainings = trainingsQuery.data?.filter((training) => training.userId === user.id) ?? [];
        // copy and paste trainings 10 times
        const multipliedTrainings = Array.from({ length: 30 }, () => actualTrainings).reduce(
            (acc, val) => acc.concat(val),
            [],
        );
        setMyTrainings(multipliedTrainings);
    }, [trainingsQuery.data, user.id]);

    const switchListing = () => {
        if (activeListing === Listing.MINE) {
            setActiveListing(Listing.ALL);
        } else {
            setActiveListing(Listing.MINE);
        }
    };

    return (
        <Dashboard>
            <Tabs isFitted variant="unstyled" p={5}>
                <ListingSwitcher activeListing={activeListing} switchListing={switchListing} />
                <TabPanels>
                    <TabPanel>
                        <TrainingsTable trainings={myTrainings} />
                    </TabPanel>
                    <TabPanel>
                        <TrainingsTable trainings={trainingsQuery.data as Training[]} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Dashboard>
    );
};
