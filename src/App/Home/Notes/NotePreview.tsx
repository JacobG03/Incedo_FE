import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../../types";
import { PreviewContainer } from "./styles";
import { ReactComponent as NoteSVG } from '../../../assets/svg/stickynote.svg'
import { ReactComponent as NoteCreatedSVG } from '../../../assets/svg/calendar-add.svg'
import { ReactComponent as NoteModifiedSVG } from '../../../assets/svg/calendar-edit.svg'
import { ReactComponent as EditSVG } from '../../../assets/svg/edit.svg'
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as RemoveSVG } from '../../../assets/svg/trash.svg'
import styled, { useTheme } from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { motion } from "framer-motion";
import { removeNote, updateNote } from "../../../redux/calls/notes_calls";
import { useDispatch } from "react-redux";


const Top = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${p => p.theme.sub};
  font-size: 1.1rem;
`

const Mid = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`

const Left = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Right = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: rgba(0,0,0,0.2);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-inner);
`

const Row = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  filter: var(--shadow);
  font-size: 1.2rem;
  
  &:focus {
    border: 1px solid ${p => p.theme.main};
    color: ${p => p.theme.main};
  };
  &:hover {
    border: 1px solid ${p => p.theme.main};
    color: ${p => p.theme.main};
  }
`

const Bottom = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-evenly;
  background-color: rgba(0,0,0,0.2);
  box-shadow: var(--shadow-inner);
  border-radius: var(--border-radius);
  padding: 0.5rem;
`

const Button2 = styled(Button)`
  flex-grow: 1;
`

interface Props {
  note: INote,
  selected: boolean
}

// Todo
// [x] delete
// share icon, dummy for now

const NotePreview = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const previewRef = useRef<HTMLDivElement>(null)
  const [canRemove, setRemove] = useState(false)

  // Handles auto scroll & tabbing & keys
  useEffect(() => {
    if (props.selected && previewRef.current) {
      previewRef.current.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
      previewRef.current.tabIndex = -1
      previewRef.current.focus()
    }
    previewRef.current?.addEventListener('keydown', keyDownHandler)
    return () => console.log('here')
  }, [props.selected, previewRef])

  const keyDownHandler = (e: any) => {
    // only execute if tab is pressed
    if (e.key !== 'Tab') return

    // here we query all focusable elements, customize as your own need
    if (previewRef.current) {
      const focusableModalElements = previewRef.current.querySelectorAll(
        'button'
      )

      const firstElement = focusableModalElements[0]
      const lastElement = focusableModalElements[focusableModalElements.length - 1]
  
      // if going forward by pressing tab and lastElement is active shift focus to first focusable element 
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }
  
      // if going backward by pressing tab and firstElement is active shift focus to last focusable element 
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    }
  }

  const handleFavorite = () => {
    updateNote(dispatch, {...props.note, favorite: !props.note.favorite})
  }

  const handleNavigate = () => {
    navigate(`/notes/${props.note.id}`)
  }

  const handleRemove = () => {
    if (!canRemove) {
      setRemove(!canRemove)
    }
    else {
      removeNote(dispatch, props.note.id)
    }
  }

  return (
    <PreviewContainer selected={props.selected} ref={previewRef}>
      <Top>
        <NoteSVG width={40} height={40} style={{minWidth: '40px', minHeight: '40px'}}/>
        <span>{props.note.title}</span>
      </Top>
      <Mid>
        <Left>
          <Row>
            <NoteModifiedSVG />
            <LocalTime timestamp={props.note.modified}/>
          </Row>
          <Row>
            <NoteCreatedSVG />
            <LocalTime timestamp={props.note.timestamp}/>
          </Row>
        </Left>
        <Right>
          <Button
            onClick={() => handleNavigate()}
            as={motion.button}
            whileHover={{cursor: 'pointer', scale: 1.05}}
            whileTap={{cursor: 'pointer', scale: 0.95}}
          >
            <EditSVG width={32} height={32} />
          </Button>
        </Right>
      </Mid>
      <Bottom>
        <Button2
          onClick={() => handleFavorite()}
          as={motion.button}
          whileHover={{cursor: 'pointer', scale: 1.05}}
          whileTap={{cursor: 'pointer', scale: 0.95}}
        >
          <FavoriteSVG fill={props.note.favorite ? theme.main : 'none'}/>
        </Button2>
        <Button2
          onClick={() => handleRemove()}
          as={motion.button}
          whileHover={{cursor: 'pointer', scale: 1.05}}
          whileTap={{cursor: 'pointer', scale: 0.95}}
        >
          {canRemove ? <span>Confirm</span>: null}
          <RemoveSVG />
        </Button2>
      </Bottom>
    </PreviewContainer>
  )
}

export default NotePreview;
