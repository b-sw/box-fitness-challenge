import { PodiumPlace } from '@box-fc/frontend/domain';
import { Optional, User } from '@box-fc/shared/types';
import { switchCase } from '@box-fc/shared/util';
import { Avatar, Text } from '@chakra-ui/react';

type Props = {
    user: Optional<User>;
    score: Optional<number>;
    maxScore: Optional<number>;
    podiumPlace: PodiumPlace;
};

export const PodiumItem = ({ user, score, maxScore, podiumPlace }: Props) => {
    const size = switchCase({
        [PodiumPlace.FIRST]: '2xl',
        [PodiumPlace.SECOND]: 'xl',
        [PodiumPlace.THIRD]: 'lg',
    })(podiumPlace);

    return (
        <>
            <Avatar name={'Test'} size={size} />
            <Text>{user?.firstName}</Text>
        </>
    );
};
