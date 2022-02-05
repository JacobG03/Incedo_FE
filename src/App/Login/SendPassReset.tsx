import { Dispatch, SetStateAction } from 'react';
import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addAlert } from "../../redux/slices/alertsSlice";
import { IFormData } from "../../types";
import { ReactComponent as CloseSVG } from '../../assets/svg/close-square.svg';
import FormError from '../../shared/FormError';
import axios from '../../services/index'
import { Button, FormInput, FormSubmit } from "../../shared/styles";


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

  & input {
    height: 32px;
    padding: 0.25rem 0.75rem;
  }
  & button {
    height: 32px;
    padding: 0.25rem 0.5rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
      as={m.div}
      transition={{ duration: 0.3 }}
      animate={{ flexGrow: 2 }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          autoFocus
          {...register('email', { required: 'Field is required.' })}
          as={m.input}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, position: "absolute" }}
          animate={{ opacity: 1, position: 'relative' }}
          placeholder={'Enter your email'}
        />
        <FormError error={errors.email} id={'send-pass-reset-error'} />
        <Options>
          <FormSubmit
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
            type='submit'
            name='Send Password Reset URL'
          >Send Email</FormSubmit>
          <Button
            type='button'
            onClick={() => setReset(prev => !prev)}
            as={m.button}
            whileHover={{ scale: 1.1, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
            name='Close Form'
          >
            <CloseSVG width={24} height={24} />
          </Button>
        </Options>
      </Form>
    </Container>
  )
}

export default SendPassReset;
