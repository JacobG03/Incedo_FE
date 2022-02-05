import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import FormError from "../../../shared/FormError";
import { FormInput, FormSubmit } from "../../../shared/styles";
import { ReactComponent as SubmitSVG } from '../../../assets/svg/tick-square.svg'
import axios from '../../../services/index'
import { useDispatch } from "react-redux";
import { addAlert } from "../../../redux/slices/alertsSlice";
import { IFormError } from '../../../types'
import { useEffect } from "react";
import styled from "styled-components";


const Form = styled.form`
  flex-grow: 1;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
`


const UpdatePassword = () => {
  const { register, handleSubmit, setError, watch, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    axios.put('/settings/password', data)
      .then(res => {
        dispatch(addAlert({ message: res.data.message }))
        setValue('password', '')
        setValue('new_password', '')
        setValue('new_password2', '')
      })
      .catch(error => {
        let errors: IFormError[] = error.response.data.detail
        errors.map(error => setError(error.loc[1], {
          type: 'manual',
          message: error.msg
        }, { shouldFocus: true }))
      })
  }

  useEffect(() => {
    setValue('password', '')
    setValue('new_password', '')
    setValue('new_password2', '')
  }, [setValue])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type='password'
        {...register('new_password', { required: 'Field is required.' })}
        placeholder='New Password' />
      <FormError error={errors.new_password} id='update-new_password-error' />
      {watch('new_password') !== ''
        ? <FormInput
          type='password'
          {...register('new_password2', { required: 'Field is required.' })}
          placeholder='Repeat new Password' />
        : null}
      <FormError error={errors.new_password2} id='update-new_password2-error' />
      {watch('new_password2') === watch('new_password') && watch('new_password2') !== ''
        ? <FormInput
          type='password'
          {...register('password', { required: 'Field is required.' })}
          placeholder='Current Password' />
        : null}
      <FormError error={errors.password} id='update-password-error' />
      {watch('password') !== '' && watch('new_password2') !== ''
        ? <FormSubmit
          type='submit'
          as={m.button}
          whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 2 }}
          whileTap={{ scale: 0.9 }}
          name='Update Password'
        >
          <SubmitSVG width={24} height={24} />
          <span>Update</span>
        </FormSubmit>
        : null}
    </Form >
  )
}

export default UpdatePassword;
