import { useReducer } from 'react';

export const useSetState = <S>(initialState: S): [S, (state: Partial<S>) => void] => {
    const [state, setState] = useReducer((state: S, newState: Partial<S>) => ({ ...state, ...newState }), initialState);
    return [state, setState];
};
