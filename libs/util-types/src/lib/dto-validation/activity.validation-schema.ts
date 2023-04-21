import Yup from './yup';

export const ActivityValidationSchema = Yup.object({
    type: Yup.string().required().min(3).max(30),
    duration: Yup.number().required().min(1).max(180),
    trainingDate: Yup.string().required(),
});
