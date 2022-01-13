import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { verifyEmail } from "../redux/userSlice";


const Container = styled.div`
  border-radius: 4px;
  padding: 2rem;
	background-color: rgba(0,0,0,0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 4px;
  padding: 2rem;
  background-color: ${props => props.theme.bg};
`


const VerifyForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: { code: string }) => {
    axios.post('/verify', data)
      .then(res => dispatch(verifyEmail()))
      .catch(error => setError('code', { type: 'manual', message: 'Not valid code.' }))
  }

  const sendNewCode = () => {
    axios.get('/verify/new')
      .then(res => console.log(res.status))
      .catch(error => setError('code', { type: 'manual', message: 'Wait some time.' }))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('code', { required: true })} placeholder='6 digit code' />
        {errors.code && <span>{errors.code.message}</span>}
        <input type='submit' />
      </Form>
      <span onClick={() => sendNewCode()}>Send new code</span>
    </Container>
  )
}

export default VerifyForm;
