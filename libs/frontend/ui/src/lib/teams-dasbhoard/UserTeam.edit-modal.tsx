import { useUserMutation } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import {
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { toastError, toastSuccess } from '../utils/toast/toast-info';

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
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size={'xs'}>
            <ModalOverlay />
            <ModalContent p={5}>
                <Formik
                    initialValues={{
                        team: user.team || '',
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
                            <ModalBody p={0} mb={5}>
                                <FormControl>
                                    <Field
                                        rounded={'full'}
                                        as={Input}
                                        id="team"
                                        name="team"
                                        type="team"
                                        placeholder="canvas, notes, etc."
                                    />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter p={0}>
                                <Flex w={'100%'} gap={5}>
                                    <Spacer />

                                    <Button
                                        type="submit"
                                        isLoading={updateMutation.isLoading}
                                        bg={'boxBlue.500'}
                                        textColor={'primary.50'}
                                    >
                                        <Text>Edit</Text>
                                    </Button>

                                    <Button onClick={handleClose}>
                                        <Text>Cancel</Text>
                                    </Button>

                                    <Spacer />
                                </Flex>
                            </ModalFooter>
                        </form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
