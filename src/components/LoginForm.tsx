import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCurrentUser } from '../redux/apiCalls'
import { IFormError } from "../types";


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

interface LoginData {
  email: string,
  password: string
}

const LoginForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: LoginData) => {
    axios.post('/login', data)
      .then(res => {
        let message = res.data.message
        console.log(message)
        getCurrentUser(dispatch)
      })
      .catch(error => {
        let errors: IFormError[] = error.response.data.detail
        console.log(errors)
        for (let i = 0; i < errors.length; i++) {
          setError(errors[i].loc[1], {
            type: 'manual',
            message: errors[i].msg
          })
        }
      })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} placeholder='Email' />
        {errors.email && <span>{errors.email.message}</span>}
        <input {...register('password', { required: true })} placeholder='Password' type='password' />
        {errors.password && <span>{errors.password.message}</span>}
        <input type='submit' />
      </Form>
    </Container>
  )
}

export default LoginForm;
