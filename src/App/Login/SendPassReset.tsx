import { Dispatch, SetStateAction } from 'react';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addAlert } from "../../redux/slices/alertsReducer";
import { IFormData } from "../../types";
import { ReactComponent as CloseSVG } from '../../assets/svg/close-square.svg';
import FormError from '../../shared/FormError';
import axios from 'axios';
import { FormInput, FormSubmit } from "../../shared/styles";


const Container = styled.div`
	flex-grow: 1;
	flex-basis: 0;
	height: fit-content;
	display: flex;
  flex-direction: column;
	align-items: center;
	padding: 0.5rem;
  gap: 1rem;
	background-color: ${p => p.theme.bg};
	border-radius: var(--border-radius);
	filter: var(--shadow);
	color: ${p => p.theme.sub};
`

const Options = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  `


const Btn = styled.button`
  border: none;
  outline: none;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.main};
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
`

type Props = {
  setReset: Dispatch<SetStateAction<boolean>>;
};

const SendPassReset = ({ setReset }: Props) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()

  const onSubmit = (data: IFormData) => {
    axios.post('/auth/send_password_reset', data)
      .then(res => {
        dispatch(addAlert({ message: 'A password reset email has been sent.' }))
        setReset(prev => !prev)
      })
      .catch(error => {
        setError('email', {
          type: 'manual',
          message: 'Enter a valid email.'
        })
      })
  }

  return (
    <Container
      as={motion.div}
      transition={{ duration: 0.3 }}
      animate={{ flexGrow: 2 }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          autoFocus
          {...register('email', { required: 'Field is required.' })}
          as={motion.input}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, position: "absolute" }}
          animate={{ opacity: 1, position: 'relative' }}
          placeholder={'Enter your email'}
        />
        <FormError error={errors.email} id={'send-pass-reset-error'} />
        <Options>
          <FormSubmit
            as={motion.input}
            whileHover={{ scale: 1.1, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
            type='submit'
            value='Send Email'
          />
          <Btn
            type='button'
            onClick={() => setReset(prev => !prev)}
            as={motion.button}
            whileHover={{ scale: 1.1, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <CloseSVG width={24} height={24} />
          </Btn>
        </Options>
      </Form>
    </Container>
  )
}

export default SendPassReset;
