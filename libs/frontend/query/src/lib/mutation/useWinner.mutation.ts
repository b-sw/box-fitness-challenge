import { CreateWinnerDto, uuid, Winner } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { WINNERS_QUERY_KEY } from '../query-keys/winners.query-key';

export const useWinnerMutation = () => {
    // todo: move this to a shared file
    const WINNERS_ENDPOINT = 'winners';
    const queryClient = useQueryClient();

    const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ queryKey: [WINNERS_QUERY_KEY] });
    };

    const createWinner = async (dto: CreateWinnerDto): Promise<Winner> => {
        const response = await axios.post(`${WINNERS_ENDPOINT}`, dto);

        return response.data;
    };

    const deleteWinner = async (winnerId: uuid): Promise<Winner> => {
        const response = await axios.delete(`${WINNERS_ENDPOINT}/${winnerId}`);

        return response.data;
    };

    const createMutation = useMutation(createWinner, {
        onSuccess: async (_: Winner) => await invalidateQueries(),
    });

    const deleteMutation = useMutation(deleteWinner, {
        onSuccess: async (_: Winner) => await invalidateQueries(),
    });

    return { createMutation, deleteMutation };
};
