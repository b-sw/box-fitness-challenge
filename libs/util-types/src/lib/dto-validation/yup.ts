import * as Yup from 'yup';

Yup.setLocale({
    mixed: {
        required: 'Field must not be empty.',
    },
    string: {
        max: ({ max }) => {
            return `Field must be at most ${max} characters`;
        },
        min: ({ min }) => {
            return `Field must be at least ${min} characters`;
        },
    },
});

export default Yup;
