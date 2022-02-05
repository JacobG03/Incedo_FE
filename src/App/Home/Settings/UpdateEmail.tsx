import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormError from "../../../shared/FormError";
import { FormInput, FormSubmit } from "../../../shared/styles";
import { IFormError, IMeInfo, IState } from "../../../types";
import { ReactComponent as SubmitSVG } from '../../../assets/svg/tick-square.svg'
import axios from '../../../services/index'
import { addAlert } from "../../../redux/slices/alertsSlice";
import { setEmail } from "../../../redux/slices/meSlice";
import { useEffect } from "react";
import { m } from "framer-motion";


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

const UpdateEmail = () => {
  const meInfo = useSelector<IState, IMeInfo | null>(state => state.me.meInfo);
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, watch, setValue, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    axios.put('/settings/email', data)
      .then(res => {
        dispatch(addAlert({ message: res.data.message }))
        dispatch(setEmail(data))
      })
      .catch(error => {
        let errors: IFormError[] = error.response.data.detail;
        for (let i = 0; i < errors.length; i++) {
          setError(errors[i].loc[1], {
            type: 'manual',
            message: errors[i].msg
          })
        }
      })
  }

  useEffect(() => {
    setValue('email', meInfo?.email)
  }, [meInfo, setValue])


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput type='text' {...register('email', { required: 'Field is required.' })} />
      <FormError error={errors.email} id='update-email-error' />
      {watch('email') !== meInfo!.email
        ? <>
          <FormInput type='password' {...register('password', { required: 'Field is required.' })} placeholder='Enter your password' />
          <FormError error={errors.password} id='auth-password-error' />
          <FormSubmit
            type='submit'
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
            name='Update Password'
          >
            <SubmitSVG width={24} height={24} />
            <span>Update</span>
          </FormSubmit>
        </>
        : null}
    </Form >
  )
}

export default UpdateEmail;
