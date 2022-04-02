import * as yup from 'yup'

const userSchema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required(),
    isAdm: yup.boolean().required()
})

export const loginSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required()
})

export default userSchema