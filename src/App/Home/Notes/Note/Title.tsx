import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormError from "../../../../shared/FormError";
import { ICruStatus, IFormData, INote, IState } from "../../../../types";
import { ReactComponent as CancelSVG } from '../../../../assets/svg/close-square.svg'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: ${p => p.theme.text};
  border-radius: var(--border-radius);

  &:focus {
    outline: 1px solid ${p => p.theme.main};
  }
`

const Cancel = styled.button`
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.main};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
`

const Submit = styled.input`
  display: none;
`

const Span = styled.span`
  color: ${p => p.theme.sub};
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
`

interface Props {
  updateNote: (note: INote) => void,
  note: INote
}

const Title = (props: Props) => {
  const [edit, setEdit] = useState(false)
  const { register, handleSubmit, setValue, setFocus, formState: { errors } } = useForm()

  const note_status = useSelector<IState, ICruStatus>(state => state.notes.updateNote)

  const onSubmit = (data: IFormData) => {
    props.updateNote({ ...props.note, ...data })
  }

  useEffect(() => {
    if (edit) {
      setValue('title', props.note.title)
      setFocus('title')
    }
  }, [edit, setValue, setFocus, props.note])

  useEffect(() => {
    if (note_status.success) {
      setEdit(!edit)
    }
  }, [note_status, edit])

  return (
    <Container>
      {
        edit
          ? <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type='text' {...register('title')} />
            <Cancel
              as={motion.button}
              whileHover={{ scale: 1.05, cursor: 'pointer' }}
              whileTap={{ scale: 0.95 }}
              type='button'
              onClick={() => setEdit(!edit)}
            >
              <CancelSVG width={24} height={24} />
            </Cancel>
            <FormError id='note-update-title-error' error={errors.title} />
            <Submit type='submit' />
          </Form>
          : <Span as={motion.span} whileHover={{ cursor: 'pointer' }} onClick={() => setEdit(!edit)}>{props.note.title}</Span>
      }
    </Container>
  )
}

export default Title;
