import * as yup from 'yup';

const productSchema = yup.object().shape({
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