import axios from '../../services/index'
import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getMe } from '../../redux/calls/me_calls'
import { addAlert } from "../../redux/slices/alertsSlice";
import FormError from "../../shared/FormError";
import { IFormError, IFormData } from "../../types";
import { FormInput, FormSubmit, Form } from "../../shared/styles";
import { ReactComponent as LoginSVG } from '../../assets/svg/login-1.svg';


const LoginForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: IFormData) => {
    axios.post('/auth/login', data)
      .then(res => {
        let message = res.data.message
        dispatch(addAlert({ message: message }))
        getMe(dispatch)
      })
      .catch(error => {
        let errors: IFormError[] = error.response.data.detail
        for (let i = 0; i < errors.length; i++) {
          setError(errors[i].loc[1], {
            type: 'manual',
            message: errors[i].msg
          })
        }
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <FormInput autoFocus {...register('email', { required: 'Field is required.' })} placeholder='Email' />
      <FormError error={errors.email} id={'login-email-error'} />
      <FormInput {...register('password', { required: 'Field is required.' })} placeholder='Password' type='password' />
      <FormError error={errors.password} id={'login-password-error'} />
      <FormSubmit
        as={m.button}
        whileHover={{ scale: 1.1, cursor: 'pointer' }}
        whileTap={{ scale: 0.9 }}
        type='submit'
      >
        <LoginSVG width={24} height={24} />
        <span>Sign in</span>
      </FormSubmit>
    </Form>
  )
}

export default LoginForm;
