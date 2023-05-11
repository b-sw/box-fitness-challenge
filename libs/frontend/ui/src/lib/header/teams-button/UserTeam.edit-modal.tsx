import { User } from '@box-fc/shared/types';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useUserMutation } from 'libs/frontend/query/src/lib/mutation/useUser.mutation';
import { useEffect } from 'react';
import { toastError, toastSuccess } from '../../utils/toast/toast-info';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    user: User;
};

export const UserTeamEditModal = ({ isOpen, handleClose, user }: Props) => {
    const { updateMutation } = useUserMutation();
    const toast = useToast();

    useEffect(() => {
        if (updateMutation.isSuccess) {
            handleClose();
            toastSuccess(toast, `${user.firstName} ${user.lastName} updated`);
        }

        if (updateMutation.isError) {
            toastError(toast, 'Error updating user');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateMutation.status]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {user.firstName} {user.lastName}'s assignments
                </ModalHeader>
                <ModalCloseButton />

                <Formik
                    initialValues={{
                        team: user.team || '',
                        division: user.division || '',
                    }}
                    onSubmit={(values) => {
                        updateMutation.mutate({
                            userId: user.id,
                            dto: { ...values },
                        });
                    }}
                >
                    {({ handleSubmit }: { handleSubmit: any }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Team</FormLabel>
                                    <Field
                                        as={Input}
                                        id="team"
                                        name="team"
                                        type="team"
                                        variant="filled"
                                        placeholder="canvas, notes, etc."
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Division</FormLabel>
                                    <Field
                                        as={Input}
                                        id="division"
                                        name="division"
                                        type="division"
                                        variant="filled"
                                        placeholder="engineering, hr, etc."
                                    />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={updateMutation.isLoading}>
                                    Edit
                                </Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
