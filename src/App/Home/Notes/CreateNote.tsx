import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createNote } from "../../../redux/calls/notes_calls";
import FormError from "../../../shared/FormError";
import { Container, FormInput, FormSubmit } from "../../../shared/styles";
import { ICruStatus, IState } from "../../../types";
import { m } from 'framer-motion';


const Container2 = styled(Container)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 240px;
  height: 240px;
  flex-direction: column;
`

const Top = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Form = styled.form`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
`

interface Props {
  display: boolean,
  setDisplay: (display: boolean) => void
}

const CreateNote = (props: Props) => {
  const status = useSelector<IState, ICruStatus>(state => state.notes.createNote)
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    createNote(dispatch, data)
  }

  useEffect(() => {
    status.errors.map(error => setError(error.loc[1], {
      type: 'manual',
      message: error.msg
    }))
  }, [status.errors, setError])

  useEffect(() => {
    if (status.success) {
      props.setDisplay(false)
    }
  }, [status.success, props])

  return (
    <AnimatePresence>
      {props.display ?
        <Container2
          as={m.div}
          transition={{duration: 0.3}}
          initial={{opacity: 0, x: -100}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -100}}
        >
          <Top>
            <span>Create Note</span>
            <span onClick={() => props.setDisplay(false)}>X</span>
          </Top>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput type='text' {...register('title', {required: 'Field is required.'})} placeholder='Title' />
            <FormError id='create-note-title' error={errors.title} />
            <FormSubmit type='submit'>
              <span>{status.pending ? 'Pending' : 'Create'}</span>
            </FormSubmit>
          </Form>
        </Container2>
        : null}
    </AnimatePresence>
  )
}

export default CreateNote;
