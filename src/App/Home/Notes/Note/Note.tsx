import axios from '../../../../services/index'
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Editor from "../../../../shared/Editor";
import AnimatedPage from '../../AnimatePage';
import { ReactComponent as BackSVG } from '../../../../assets/svg/arrow-left.svg'
import { ReactComponent as TrashSVG } from '../../../../assets/svg/trash.svg'
import { ReactComponent as SaveSVG } from '../../../../assets/svg/tick-square.svg'
import { Button } from '../../../../shared/styles';
import { motion } from 'framer-motion';
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
  height: fit-content;
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  flex-direction: column;
`

const Section = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 4rem;
`

const ExitButton = styled(Button)`
  position: absolute;
  width: 4rem;
  height: 2rem;
  left: 0.5rem;
  top: 0.5rem;
`

const RemoveButton = styled(Button)`
  position: absolute;
  height: 2rem;
  width: fit-content;
  top: 0.5rem;
  right: 0.5rem;
`

const Note = () => {
  const navigate = useNavigate()
  const location = useLocation()

  let id = location.pathname.split('/').at(-1)
  const { note, update } = useNote(id!)

  const [canDelete, setDelete] = useState(false)
  const dispatch = useDispatch()

  const mounted = useRef(false);

  const [body, setBody] = useState<string | null>(null)

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.keyCode === 27) {
        if (note?.parent_id) {
          navigate('/sections/' + note.parent_id)
        } else {
          navigate('/notes')
        }
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [navigate, note])

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    }
  }, [])

  useEffect(() => {
    if (note) {
      setBody(note.body)
    }
  }, [note])

  const handleDelete = () => {
    if (canDelete && note) {
      removeNote(dispatch, note.id)
      navigate('/')
    } else {
      setDelete(true)
      setTimeout(() => {
        if (mounted.current) {
          setDelete(false)
        }
      }, 2000)
    }
  }

  const handleChange = useCallback((state: string) => {
    if (note) {
      setBody(state)
    }
  }, [note])

  const handleSave = useCallback(() => {
    if (note && note.id) {
      let new_note = { ...note, body: body }
      update(new_note)
    }
  }, [body, note, update])

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // ctrl + s
      if(e.keyCode === 83 && e.ctrlKey) {
        e.preventDefault()
        handleSave()
      }
    }
    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [handleSave])

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
          {body !== note.body
            ?
            <Button
              as={motion.button}
              whileHover={{ scale: 1.05, cursor: 'pointer' }}
              whileTap={{scale: 0.95}}
              onClick={() => handleSave()}
            >
              <span>Save</span>
              <SaveSVG />
            </Button>
            : null
          }
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
