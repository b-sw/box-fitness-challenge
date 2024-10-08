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
import { RiPinDistanceLine } from 'react-icons/all';
import { BiRun } from 'react-icons/bi';
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
                        distance: 0,
                        trainingDate: dayjs().format('YYYY-MM-DDTHH:mm'),
                    }}
                    onSubmit={(values) => {
                        createMutation.mutate({
                            ...values,
                            distance: Number(values.distance),
                            trainingDate: dayjs(values.trainingDate, DATETIME_FORMAT).toDate(),
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            userId: currentUserId,
                        });
                    }}
                >
                    {({ handleSubmit }: { handleSubmit: any }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody p={0} mb={5}>
                                <Flex direction={'column'} gap={3} textColor={'primary.500'}>
                                    <Flex w={'100%'} gap={3}>
                                        <Flex alignItems={'center'} gap={1} w={'40%'}>
                                            <Flex w={'25%'}>
                                                <RiPinDistanceLine size={'30'} />
                                            </Flex>

                                            <FormControl w={'75%'}>
                                                <NumberInput
                                                    min={0.1}
                                                    max={999}
                                                    variant="filled"
                                                    textColor={'primary.500'}
                                                >
                                                    <Field
                                                        rounded={'full'}
                                                        as={NumberInputField}
                                                        name="distance"
                                                        id="distance"
                                                        placeholder={'km' + ''}
                                                        bg={'gray.50'}
                                                        _hover={{
                                                            background: 'gray.100',
                                                        }}
                                                        _focus={{
                                                            background: 'gray.50',
                                                        }}
                                                        _placeholder={{
                                                            color: 'gray.400',
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
                                                placeholder="activity name"
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
