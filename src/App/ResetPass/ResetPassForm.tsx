import axios from '../../services/index'
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAlert } from "../../redux/slices/alertsReducer";
import FormError from "../../shared/FormError";
import { IFormData, IFormError } from "../../types";
import { Form, FormInput, FormSubmit } from "../../shared/styles";


const ResetPassForm = () => {
  let { uri } = useParams();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = (data: IFormData) => {
    axios.post(`/auth/reset_password/${uri}`, data)
      .then(() => {
        dispatch(addAlert({ message: 'Password has been changed.' }))
        navigate('/login')
      })
      .catch(err => {
        if (err.response.status === 404) {
          navigate('/login')
          return
        }
        let errors: IFormError[] = err.response.data.detail
        for (let i = 0; i < errors.length; i++) {
          let name = errors[i].loc[1]
          setError(name, {
            type: 'manual',
            message: errors[i].msg
          })
        }
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <FormInput autoFocus type='password' {...register('password', { required: 'Field is required.' })} placeholder='New Password' />
      <FormError error={errors.password} id={'reset-pass-error'} />
      <FormInput type='password' {...register('password2', { required: 'Field is required.' })} placeholder='Repeat Password' />
      <FormError error={errors.password2} id={'reset-pass2-error'} />
      <FormSubmit
        as={motion.input}
        whileHover={{ scale: 1.1, cursor: 'pointer' }}
        whileTap={{ scale: 0.9 }}
        type='submit'
        value='Submit'
      />
    </Form>
  )
}

export default ResetPassForm;
