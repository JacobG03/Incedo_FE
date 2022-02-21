import axios from '../../../../services/index'
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Editor from "../../../../shared/Editor";
import AnimatedPage from '../../AnimatePage';
import { ReactComponent as BackSVG } from '../../../../assets/svg/arrow-left.svg'
import { ReactComponent as TrashSVG } from '../../../../assets/svg/trash.svg'
import { Button } from '../../../../shared/styles';
import { motion } from 'framer-motion';
import { useEscape } from '../../hooks';
import { INote } from "../../../../types";
import Title from './Title';
import { useDispatch } from 'react-redux';
import { removeNote, updateNote } from '../../../../redux/calls/notes_calls';


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: var(--border-radius2);
  background-color: ${p => p.theme.bg};
`

const Control = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
`

const Section = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 4rem;
`

const ExitButton = styled(Button)`
  position: absolute;
  width: 4rem;
  height: 3rem;
  left: 0;
  top: 0;
`

const RemoveButton = styled(Button)`
  position: absolute;
  height: 3rem;
  width: fit-content;
  top: 0;
  right: 0;
`

const Note = () => {
  useEscape('/notes')
  const navigate = useNavigate()
  const location = useLocation()

  let id = location.pathname.split('/').at(-1)
  const { note, update } = useNote(id!)

  const [canDelete, setDelete] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (canDelete && note) {
      removeNote(dispatch, note.id)
      navigate('/')
    } else {
      setDelete(true)
      setTimeout(() => {
        setDelete(false)
      }, 2000)
    }
  }

  const handleChange = useCallback((state: string) => {

  }, [])

  if (!note) {
    return null
  }

  return (
    <AnimatedPage>
      <Control>
        <Section>
          <Title note={note} updateNote={update} />
          <ExitButton
            as={motion.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/notes')}
          >
            <BackSVG />
          </ExitButton>
          <RemoveButton
            as={motion.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete()}
          >
            {canDelete ? <span>Confirm</span> : null}
            <TrashSVG />
          </RemoveButton>
        </Section>
        <Section>
          <span>bottom</span>
        </Section>
      </Control>
      <Container>
        <Editor initialDoc={note.body ? note.body : ''} preview={false} onChange={handleChange} />
      </Container>
    </AnimatedPage>
  )
}

const useNote = (id: string) => {
  const [note, setNote] = useState<INote | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`/notes/${id}`)
      .then(res => setNote(res.data))
      .catch(error => console.log(error.response))
  }, [id])

  const update = (note: INote) => {
    updateNote(dispatch, note)
    setNote(note)
  }

  return { note, update }
}

export default Note;
