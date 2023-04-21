// import { useActivityMutation, useAuthQuery } from '@box-fc/data-access';
// import { ActivityValidationSchema, CreateActivityDto } from '@box-fc/util-types';
// import {
//     Button,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
// } from '@chakra-ui/react';
// import { Form, Formik } from 'formik';
// import { InputControl, NumberInputControl } from 'formik-chakra-ui';
// import { useEffect } from 'react';
//
// type ActivityCreateModalProps = {
//     isOpen: boolean;
//     handleClose: () => void;
// };
//
// type FormikValues = Omit<CreateActivityDto, 'userId' | 'registrationDate'>;
//
// export const ActivityCreateModal = ({ isOpen, handleClose }: ActivityCreateModalProps) => {
//     const { authQuery } = useAuthQuery();
//     const { createMutation } = useActivityMutation();
//
//     useEffect(() => {
//         if (createMutation.isSuccess) {
//             handleClose();
//             createMutation.reset();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [createMutation.isSuccess]);
//
//     const initialValues: FormikValues = {
//         type: '',
//         duration: 0,
//         trainingDate: new Date(),
//     };
//
//     const createActivity = (formikValues: FormikValues) => {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         createMutation.mutate({ ...formikValues, userId: authQuery.data!.userId!, registrationDate: new Date() });
//     };
//
//     return (
//         <Modal isOpen={isOpen} onClose={handleClose} isCentered>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>Register training</ModalHeader>
//                 <ModalCloseButton />
//
//                 <Formik
//                     initialValues={initialValues}
//                     onSubmit={createActivity}
//                     validationSchema={ActivityValidationSchema}
//                 >
//                     {({ handleSubmit }) => (
//                         <Form onSubmit={handleSubmit}>
//                             <ModalBody>
//                                 <InputControl
//                                     name="type"
//                                     label={'Training type'}
//                                     inputProps={{ placeholder: 'gym, football, sauna...' }}
//                                     // inputProps={{ type: 'datetime-local' }}
//                                 />
//                                 <NumberInputControl
//                                     name="duration"
//                                     label={'Training duration'}
//                                     placeholder={'in minutes'}
//                                 />
//
//                                 <InputControl
//                                     name="trainingDate"
//                                     label={'Training date'}
//                                     // inputProps={{ type: 'datetime-local' }}
//                                 />
//                             </ModalBody>
//                             <ModalFooter>
//                                 <Button colorScheme="blue" mr={'3'} type="submit" isLoading={createMutation.isLoading}>
//                                     Add
//                                 </Button>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                             </ModalFooter>
//                         </Form>
//                     )}
//                 </Formik>
//             </ModalContent>
//         </Modal>
//     );
// };
