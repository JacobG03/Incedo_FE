import styled from "styled-components";
import { IMeInfo, IState } from '../../../types'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import axios from '../../../services/index'
import { useRef, useState } from "react";
import { addAlert } from "../../../redux/slices/alertsSlice";
import { Button, FormSubmit } from "../../../shared/styles";
import { m } from "framer-motion";
import { ReactComponent as CloseSVG } from '../../../assets/svg/close-square.svg';
import { ReactComponent as SubmitSVG } from '../../../assets/svg/tick-square.svg';


const Avatar = styled.img<{ preview: string | null }>`
  width: ${(p) => (p.preview ? '160px' : '128px')};
  height: ${(p) => (p.preview ? '160px' : '128px')};
  transform: ${(p) => (p.preview ? 'translateY(-5rem)' : 'translateY(0)')};
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 400ms ease-in-out;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--border-radius);
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
`

const Form = styled.form`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem;
`

const Button2 = styled(Button)`
  flex-grow: 1;
  padding: 0.5rem;
`

const FormSubmit2 = styled(FormSubmit)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`

const UploadAvatar = () => {
  const meInfo = useSelector<IState, IMeInfo | null>(state => state.me.meInfo);
  const { register, handleSubmit } = useForm()
  const selectFile = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const { ref } = register('avatar', { required: true });
  const dispatch = useDispatch()


  const onChange = () => {
    var file = selectFile.current?.files![0];
    var reader = new FileReader();
    reader.readAsDataURL(file!);

    reader.onloadend = function (e) {
      setPreview(reader.result!.toString())
    }
  }

  const onSubmit = () => {
    let file = selectFile.current?.files![0]!
    let formData = new FormData();
    formData.append('avatar', file);

    axios.put('/settings/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch(addAlert({ message: 'Avatar updated successfully.' }))
        setPreview(null)
      })
      .catch(error => {
        if (error.response.status === 413) {
          dispatch(addAlert({ message: 'Image > 2MB. Try a smaller file.' }))
        }
      })
  }

  return (
    <Container>
      <Avatar
        src={preview ? preview.toString() : meInfo?.avatar_url}
        alt='Avatar'
        onClick={() => selectFile.current?.click()}
        preview={preview}
      />
      <Form onSubmit={handleSubmit(onSubmit)} >
        <input
          type='file'
          accept='image/*'
          ref={(e) => {
            ref(e)
            selectFile.current = e
          }}
          onChange={onChange}
          style={{ display: 'none' }}
        />
        {preview
          ? <Button2
            onClick={() => setPreview(null)}
            as={m.button}
            whileHover={{ scale: 1.1, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <CloseSVG width={24} height={24} />
          </Button2>
          : null}
        {preview ?
          <FormSubmit2
            type='submit'
            as={m.button}
            whileHover={{ scale: 1.1, cursor: 'pointer', zIndex: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <SubmitSVG width={24} height={24} />
          </FormSubmit2>
          : null}
      </Form>
    </Container>
  )
}

export default UploadAvatar;
