import * as yup from 'yup';

export const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*$)/, 'Имя не должно содержать чисел')
        .required("Имя - обязательное поле для заполнения"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*$)/, 'Фамилия не должна содержать чисел')
        .required("Фамилия - обязательное поле для заполнения"),
    phone: yup
        .string()
        .matches(/^([^a-zA-Z]*$)/, 'Телефон не должен содержать символов')
        .required("Телефон - обязательное поле для заполнения"),
    city: yup
        .string()
        .matches(/^([^0-9]*$)/, 'Город не должен содержать символов')
        .required("Город - обязательное поле для заполнения"),
    payment: yup
        .string()
        .nullable()
        .required("Оплата - обязательное поле для заполнения"),
});