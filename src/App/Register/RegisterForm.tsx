import axios from '../../services/index'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getMe } from '../../redux/calls/me_calls'
import { IFormError, IFormData } from "../../types";
import FormError from "../../shared/FormError";
import { motion } from "framer-motion";
import { addAlert } from "../../redux/slices/alertsReducer";
import { Form, FormInput, FormSubmit } from "../../shared/styles";
import styled from "styled-components";


const FormInput2 = styled(FormInput)`
  font-size: 1.1rem;
  padding: 0.5rem;
`

const FormSubmit2 = styled(FormSubmit)`
  padding: 0.25rem 0.5rem;
`


const RegisterForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: IFormData) => {
    axios.post('/auth/register', data)
      .then(res => {
        let message = res.data.message
        dispatch(addAlert({ message: message }))
        getMe(dispatch)
      })
      .catch(error => {
        let errors: IFormError[] = error.response.data.detail
        for (let i = 0; i < errors.length; i++) {
          if (errors[i].type === 'value_error.email') {
            errors[i].msg = 'Enter a valid email address.'
          }
          setError(errors[i].loc[1], {
            type: 'manual',
            message: errors[i].msg
          })
        }
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput2 autoFocus {...register('username', { required: 'Field is required.' })} placeholder='Username' />
      <FormError error={errors.username} id={'register-usename-error'} />
      <FormInput2 {...register('email', { required: 'Field is required.' })} placeholder='Email' />
      <FormError error={errors.email} id={'register-email-error'} />
      <FormInput2 {...register('password', { required: 'Field is required.' })} placeholder='Password' type='password' />
      <FormError error={errors.password} id={'register-password-error'} />
      <FormInput2 {...register('password2', { required: 'Field is required.' })} placeholder='Repeat Password' type='password' />
      <FormError error={errors.password2} id={'register-password2-error'} />
      <FormSubmit2
        as={motion.input}
        whileHover={{ scale: 1.1, cursor: 'pointer' }}
        whileTap={{ scale: 0.9 }}
        type='submit'
        value='Sign up'
      />
    </Form>
  )
}

export default RegisterForm;
