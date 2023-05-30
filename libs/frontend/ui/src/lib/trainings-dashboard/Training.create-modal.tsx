import { useTrainingMutation } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
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
    NumberInput,
    NumberInputField,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { BiRun } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import { DATETIME_FORMAT } from '../utils/datetime/datetime.format';
import { toastError, toastSuccess } from '../utils/toast/toast-info';

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
            <ModalContent p={[5]} borderRadius={25}>
                <Formik
                    initialValues={{
                        type: '',
                        duration: 0,
                        trainingDate: dayjs().format('YYYY-MM-DDTHH:mm'),
                    }}
                    onSubmit={(values) => {
                        createMutation.mutate({
                            ...values,
                            duration: Number(values.duration),
                            trainingDate: dayjs(values.trainingDate, DATETIME_FORMAT).toDate(),
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            userId: currentUserId,
                        });
                    }}
                >
                    {({ handleSubmit }: { handleSubmit: any }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody p={0} mb={5}>
                                <Flex direction={'column'} gap={3}>
                                    <Flex w={'100%'} gap={3}>
                                        <Flex alignItems={'center'} gap={1} w={'40%'}>
                                            <Flex w={'25%'}>
                                                <MdOutlineTimer size={'30'} />
                                            </Flex>

                                            <FormControl w={'75%'}>
                                                <NumberInput min={1} max={1440} variant="filled">
                                                    <Field
                                                        rounded={'full'}
                                                        as={NumberInputField}
                                                        name="duration"
                                                        id="duration"
                                                        placeholder={'mins'}
                                                        bg={'gray.50'}
                                                        _hover={{
                                                            background: 'gray.100',
                                                        }}
                                                        _focus={{
                                                            background: 'gray.50',
                                                        }}
                                                    />
                                                </NumberInput>
                                            </FormControl>
                                        </Flex>

                                        <Flex alignItems={'center'} gap={1} w={'60%'}>
                                            <FormControl>
                                                <Field
                                                    rounded={'full'}
                                                    as={Input}
                                                    name="trainingDate"
                                                    id="trainingDate"
                                                    type="datetime-local"
                                                />
                                            </FormControl>
                                        </Flex>
                                    </Flex>

                                    <Flex alignItems={'center'} gap={1} w={'100%'}>
                                        <Flex w={'10%'}>
                                            <BiRun size={'30px'} />
                                        </Flex>

                                        <FormControl w={'90%'}>
                                            <Field
                                                rounded={'full'}
                                                as={Input}
                                                id="type"
                                                name="type"
                                                type="type"
                                                placeholder="e.g. running, cycling, etc."
                                            />
                                        </FormControl>
                                    </Flex>
                                </Flex>
                            </ModalBody>

                            <ModalFooter p={0}>
                                <Flex w={'100%'} gap={5}>
                                    <Spacer />

                                    <Button
                                        type="submit"
                                        isLoading={createMutation.isLoading}
                                        bg={'boxBlue.500'}
                                        textColor={'primary.50'}
                                    >
                                        <Text>Add</Text>
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
