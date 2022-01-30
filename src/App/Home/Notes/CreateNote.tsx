import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../../../shared/FormError';
import { Form, FormInput, FormSubmit } from '../../../shared/styles';
import Editor from '../../../shared/Editor';
import axios from '../../../services/index';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../redux/slices/notesSlice';
import styled from 'styled-components';
import { addAlert } from '../../../redux/slices/alertsSlice';


const Form2 = styled(Form)`
  width: fit-content;
  align-items: center;
`

interface Props {
  setDisplay: (display: boolean) => void
}

const CreateNote: React.FC<Props> = (props) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm()
  const [doc, setDoc] = useState<string>('')
  const dispatch = useDispatch()
  const [preview, setPreview] = useState(false)
  
  const handleDocChange = useCallback(newDoc => {
    setValue('body', newDoc)
    setDoc(newDoc)
  }, [setValue, setDoc])

  const onSubmit = useCallback(data => {
    axios.post('/notes', data)
    .then(res => {
      dispatch(addNote(res.data))
      dispatch(addAlert({message: 'Note created.'}))
      props.setDisplay(false)
    })
    .catch(error => console.log(error.response.data.detail))
  }, [dispatch, props.setDisplay])

  const handleKeys = useCallback(e => {
    if (e.ctrlKey && (e.keyCode === 13 || e.keyCode === 83)) {
    e.preventDefault();
    onSubmit({
      title: watch('title'),
      body: doc
    })
    }
  }, [onSubmit, watch, doc])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeys)

    return () => document.removeEventListener('keydown', handleKeys)
  }, [handleKeys])

  return (
    <Form2 onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...register('title', { required: 'Field is required.' })}
        placeholder='Title'
      />
      <FormError error={errors.title} id='create-note-title' />
      <Editor initialDoc={doc} preview={preview} onChange={handleDocChange} />
      <FormSubmit type='submit'>
        <span>Create</span>
      </FormSubmit>
    </Form2>
  );
}

export default CreateNote;
