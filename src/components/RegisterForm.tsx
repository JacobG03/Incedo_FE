import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getCurrentUser } from "../redux/apiCalls";
import { useDispatch } from "react-redux";


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

interface RegisterData {
  username: string,
  email: string,
  password: string,
  password2: string
}

const RegisterForm = () => {
  const { register, handleSubmit, setError, formState: {errors} } = useForm();
  const dispatch = useDispatch()
  const onSubmit = (data: RegisterData) => {
    axios.post('/register', data)
    .then(res => {
      let message = res.data.message
      console.log(message)
      getCurrentUser(dispatch)
    })
    .catch(error => {
      let errors = error.response.data.detail
      for (let i = 0; i < errors.length; i++) {
        // Overwrite response message
        if (errors[i].type === 'value_error.email') {
          setError(errors[i].loc[1], {
            type: 'manual',
            message: 'Enter a valid email address.'
          })
        } else {
          setError(errors[i].loc[1], {
            type: 'manual',
            message: errors[i].msg
          })
        }
      }
    })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username', { required: true })} placeholder='Username' />
        {errors.username && <span>{errors.username.message}</span>}
        <input {...register('email', { required: true })} placeholder='Email' />
        {errors.email && <span>{errors.email.message}</span>}
        <input {...register('password', { required: true })} placeholder='Password' type='password' />
        {errors.password && <span>{errors.password.message}</span>}
        <input {...register('password2', { required: true })} placeholder='Repeat password' type='password' />
        {errors.password2 && <span>{errors.password2.message}</span>}
        <input type='submit' />
      </Form>
    </Container>
  )
}

export default RegisterForm;
