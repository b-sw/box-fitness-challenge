import { useActivityMutation, useAuthQuery } from '@box-fc/frontend/query';
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
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';

type ActivityCreateModalProps = {
    isOpen: boolean;
    handleClose: () => void;
};

export const ActivityCreateModal = ({ isOpen, handleClose }: ActivityCreateModalProps) => {
    const { authQuery } = useAuthQuery();
    const { createMutation } = useActivityMutation();

    useEffect(() => {
        if (createMutation.isSuccess) {
            handleClose();
            createMutation.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createMutation.isSuccess]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register training</ModalHeader>
                <ModalCloseButton />

                <Formik
                    initialValues={{
                        type: '',
                        duration: 0,
                        trainingDate: new Date(),
                    }}
                    onSubmit={(values) => {
                        createMutation.mutate({
                            ...values,
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            userId: authQuery.data!.userId!,
                            registrationDate: new Date(),
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
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
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
