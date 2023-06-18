import { Training, useTrainingsQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { useEffect, useState } from 'react';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { ListingSwitcher } from '../utils/generic-components/ListingSwitcher';
import { TrainingsTable } from './Trainings.table';

enum Listing {
    MINE = 'My trainings',
    ALL = 'All trainings',
}

export const TrainingsDashboard = () => {
    const { trainingsQuery } = useTrainingsQuery();
    const { user } = useAuthStore();
    const [myTrainings, setMyTrainings] = useState<Training[]>([]);
    const [activeListing, setActiveListing] = useState<Listing>(Listing.MINE);

    useEffect(() => {
        setMyTrainings(trainingsQuery.data?.filter((training) => training.userId === user.id) ?? []);
    }, [trainingsQuery.data, user.id]);

    const pages = {
        [Listing.MINE]: <TrainingsTable trainings={myTrainings} />,
        [Listing.ALL]: <TrainingsTable trainings={trainingsQuery.data as Training[]} />,
    };

    const switchListing = () => {
        if (activeListing === Listing.MINE) {
            setActiveListing(Listing.ALL);
        } else {
            setActiveListing(Listing.MINE);
        }
    };

    return (
        <Dashboard>
            <ListingSwitcher activeListing={activeListing} switchListing={switchListing} />

            {pages[activeListing]}
        </Dashboard>
    );
};
