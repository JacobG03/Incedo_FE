import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormError from "../../../shared/FormError";
import { FormInput, FormSubmit } from "../../../shared/styles";
import { IFormError, IMeInfo, IState } from "../../../types";
import { ReactComponent as SubmitSVG } from '../../../assets/svg/tick-square.svg'
import axios from '../../../services/index'
import { setUsername } from "../../../redux/slices/meSlice";
import { addAlert } from "../../../redux/slices/alertsSlice";
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

const UpdateUsername = () => {
  const meInfo = useSelector<IState, IMeInfo | null>(state => state.me.meInfo);
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, watch, formState: { errors }, setValue } = useForm()

  const onSubmit = (data: any) => {
    axios.put('/settings/username', data)
      .then(res => {
        dispatch(setUsername(data))
        dispatch(addAlert({ message: res.data.message }))
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
    setValue('username', meInfo?.username)
  }, [meInfo, setValue])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput type='text' {...register('username', { required: 'Field is required.' })} />
      <FormError error={errors.username} id='update-username-error' />
      {watch('username') !== meInfo!.username
        ? <FormSubmit
          type='submit'
          as={m.button}
          whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <SubmitSVG width={24} height={24} />
          <span>Update</span>
        </FormSubmit>
        : null}
    </Form >
  )
}

export default UpdateUsername;
