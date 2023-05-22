import { useTrainingMutation } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
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
    NumberInput,
    NumberInputField,
    useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { DATETIME_FORMAT } from '../../utils/datetime/datetime.format';
import { toastError, toastSuccess } from '../../utils/toast/toast-info';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

export const TrainingCreateModal = ({ isOpen, handleClose }: Props) => {
    const {
        user: { id: currentUserId },
    } = useAuthStore();
    const { createMutation } = useTrainingMutation();
    const toast = useToast();

    useEffect(() => {
        if (createMutation.isSuccess) {
            handleClose();
            toastSuccess(toast, 'Training registered');
        }

        if (createMutation.isError) {
            toastError(toast, (createMutation.error as Error).message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createMutation.status]);

    if (!currentUserId) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register training</ModalHeader>
                <ModalCloseButton />

                <Formik
                    initialValues={{
                        type: '',
                        duration: 30,
                        trainingDate: dayjs.utc().toDate(),
                    }}
                    onSubmit={(values) => {
                        createMutation.mutate({
                            ...values,
                            trainingDate: dayjs(values.trainingDate, DATETIME_FORMAT).toDate(),
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            userId: currentUserId,
                            registrationDate: dayjs.utc().toDate(),
                        });
                    }}
                >
                    {({ handleSubmit }: { handleSubmit: any }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>training type</FormLabel>
                                    <Field
                                        as={Input}
                                        id="type"
                                        name="type"
                                        type="type"
                                        variant="filled"
                                        placeholder="running, football, etc."
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>training duration (minutes)</FormLabel>
                                    <NumberInput
                                        defaultValue={30}
                                        min={0}
                                        max={180}
                                        placeholder="in minutes"
                                        variant="filled"
                                    >
                                        <Field as={NumberInputField} name="duration" id="duration"></Field>
                                    </NumberInput>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>training date</FormLabel>
                                    <Field as={Input} name="trainingDate" id="trainingDate" type="datetime-local" />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={createMutation.isLoading}>
                                    Add
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
