import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../../../shared/FormError';
import { Form, FormInput, FormSubmit } from '../../../shared/styles';
import Editor from '../../../shared/Editor';
import axios from '../../../services/index';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../redux/slices/notesSlice';


function CreateNote() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [doc, setDoc] = useState<string>('')
  const dispatch = useDispatch()
  const [preview, setPreview] = useState(false)
  
  const handleDocChange = useCallback(newDoc => {
    setValue('body', newDoc)
    setDoc(newDoc)
  }, [setValue, setDoc])

  const onSubmit = (data: any) => {
    axios.post('/notes', data)
    .then(res => {
      dispatch(addNote(res.data))
    })
    .catch(error => console.log(error.response.data.detail))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...register('title', { required: 'Field is required.' })}
        placeholder='Title'
      />
      <FormError error={errors.title} id='create-note-title' />
      <Editor initialDoc={doc} preview={preview} onChange={handleDocChange} />
      <FormSubmit type='submit'>
        <span>Create</span>
      </FormSubmit>
    </Form>
  );
}

export default CreateNote;
