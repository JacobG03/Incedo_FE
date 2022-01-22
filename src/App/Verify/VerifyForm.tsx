import axios from '../../services/index'
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getMe } from '../../redux/calls/me_calls'
import { addAlert } from "../../redux/slices/alertsReducer";
import FormError from "../../shared/FormError";
import { IFormError, IFormData } from "../../types";
import { Form, FormInput, FormSubmit } from "../../shared/styles";


const VerifyForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: IFormData) => {
    axios.post('/auth/verify_email', data)
      .then(res => {
        dispatch(addAlert({ message: res.data.message }))
        getMe(dispatch)
      })
      .catch(err => {
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
      <FormInput autoFocus {...register('code', { required: 'Field is required.' })} placeholder='Enter your code' />
      <FormError error={errors.code} id={'verify-code-error'} />
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

export default VerifyForm;
