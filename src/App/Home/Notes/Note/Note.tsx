import axios from '../../../../services/index'
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Editor from "../../../../shared/Editor";
import { useDispatch } from 'react-redux';
import { INote } from '../../../../types';
import AnimatedPage from '../../AnimatePage';
import { ReactComponent as BackSVG } from '../../../../assets/svg/arrow-left.svg'
import { ReactComponent as EditSVG } from '../../../../assets/svg/edit.svg'
import { ReactComponent as TrashSVG } from '../../../../assets/svg/trash.svg'
import { ReactComponent as SwitchSVG } from '../../../../assets/svg/mirror.svg'
import { Button } from '../../../../shared/styles';
import { m } from 'framer-motion';
import { removeNote, updateNote } from '../../../../redux/calls/notes_calls';
import { useEscape } from '../../hooks';


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: var(--border-radius2);
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
`

const Options = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  justify-content: space-evenly;
  color: ${p => p.theme.main};
`

const Button2 = styled(Button)`
  flex-grow: 1;
  height: 100%;
`

const Note = () => {
  const [data, setData] = useState<INote | null>(null)
  useEscape('/notes')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [mounted, setMount] = useState(true)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    axios.get(location.pathname)
      .then(res => {
        updateNote(dispatch, res.data)
        setData(res.data)
      })
      .catch(error => console.log(error.response.data.detail))

    return () => setMount(false)
  }, [dispatch, location])

  const handleSave = useCallback(() => {
    if (data) {
      updateNote(dispatch, data)
    }
  }, [data, dispatch])

  const handleChange = useCallback((state: string) => {
    if (data && mounted) {
      let new_data = data
      new_data.body = state
      setData(new_data)
    }
  }, [data, mounted])

  const handleKeys = useCallback(e => {
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      handleSave()
    }
  }, [handleSave])

  const handleNavigate = useCallback(() => {
    handleSave()
    navigate('/notes')
  }, [navigate, handleSave])

  useEffect(() => {
    document.addEventListener('keydown', handleKeys)

    return () => document.removeEventListener('keydown', handleKeys)
  }, [handleKeys])

  if (!data) {
    return null
  }

  return (
    <AnimatedPage>
      <Container>
        <Options>
          <Button2
            onClick={() => handleNavigate()}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            <BackSVG />
          </Button2>
          <Button2
            onClick={() => setPreview(!preview)}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            {preview
              ? <EditSVG />
              : <SwitchSVG />}
          </Button2>
          <Button2
            onClick={() => handleSave()}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Save</span>
          </Button2>
          <Button2
            onClick={() => removeNote(dispatch, data.id)}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            <TrashSVG />
          </Button2>
        </Options>
        <Editor initialDoc={data.body ? data.body: ''} preview={preview} onChange={handleChange} />
      </Container>
    </AnimatedPage>
  )
}

export default Note;
