import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../../types";
import { Button, PreviewBottom, PreviewButton2, PreviewContainer,
   PreviewLeft, PreviewMid, PreviewRight, PreviewRow, PreviewTop } from "./styles";
import { ReactComponent as NoteSVG } from '../../../assets/svg/stickynote.svg'
import { ReactComponent as NoteCreatedSVG } from '../../../assets/svg/calendar-add.svg'
import { ReactComponent as NoteModifiedSVG } from '../../../assets/svg/calendar-edit.svg'
import { ReactComponent as EditSVG } from '../../../assets/svg/edit.svg'
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as RemoveSVG } from '../../../assets/svg/trash.svg'
import { useTheme } from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { motion } from "framer-motion";
import { removeNote, updateNote } from "../../../redux/calls/notes_calls";
import { useDispatch } from "react-redux";


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
    previewRef.current?.addEventListener('keydown', keyDownHandler)

    if (props.selected && previewRef.current) {
      previewRef.current.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
      previewRef.current.tabIndex = -1
      previewRef.current.focus()
    }
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
    updateNote(dispatch, { ...props.note, favorite: !props.note.favorite })
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

  useEffect(() => {
    if (canRemove) {
      var removeWindow = setTimeout(() => {
        setRemove(false)
      }, 3000)
    }
    return () => clearTimeout(removeWindow)
  }, [canRemove])

  return (
    <PreviewContainer selected={props.selected} ref={previewRef}>
      <PreviewTop>
        <NoteSVG width={40} height={40} style={{ minWidth: '40px', minHeight: '40px' }} />
        <span>{props.note.title}</span>
      </PreviewTop>
      <PreviewMid>
        <PreviewLeft>
          <PreviewRow>
            <NoteModifiedSVG />
            <LocalTime timestamp={props.note.modified} />
          </PreviewRow>
          <PreviewRow>
            <NoteCreatedSVG />
            <LocalTime timestamp={props.note.timestamp} />
          </PreviewRow>
        </PreviewLeft>
        <PreviewRight>
          <Button
            onClick={() => handleNavigate()}
            as={motion.button}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ cursor: 'pointer', scale: 0.95 }}
          >
            <EditSVG width={32} height={32} />
          </Button>
        </PreviewRight>
      </PreviewMid>
      <PreviewBottom>
        <PreviewButton2
          onClick={() => handleFavorite()}
          as={motion.button}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ cursor: 'pointer', scale: 0.95 }}
        >
          <FavoriteSVG fill={props.note.favorite ? theme.sub : 'none'} />
        </PreviewButton2>
        <PreviewButton2
          onClick={() => handleRemove()}
          as={motion.button}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ cursor: 'pointer', scale: 0.95 }}
        >
          {canRemove ? <span>Confirm</span> : null}
          <RemoveSVG />
        </PreviewButton2>
      </PreviewBottom>
    </PreviewContainer>
  )
}

export default NotePreview;
