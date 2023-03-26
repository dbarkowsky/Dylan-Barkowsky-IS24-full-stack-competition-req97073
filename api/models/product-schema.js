import yup from 'yup';

// Data Schema for a New Message
// Matches the one from the front-end App!
const productSchema = yup.object().shape({
    // productId: yup
    //     .number()
    //     .positive()
    //     .min(1)
    //     .max(64000)
    //     .required(),
    productName: yup
        .string()
        .min(2)
        .max(50)
        .trim()
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)
        .required(),
    productOwnerName: yup
        .string()
        .min(2)
        .max(50)
        .trim()
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)
        .required(),
    developers: yup
        .array()
        .max(5)
        .required(),
    scrumMasterName: yup
        .string()
        .min(2)
        .max(50)
        .trim()
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)
        .required(),
    startDate: yup
        .string()
        .trim()
        .required(),
    methodology: yup
        .string()
        .trim()
        .matches(/^(Agile|Waterfall)$/g)
        .required()
});

export default productSchema;