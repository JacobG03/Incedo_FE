import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISection } from "../../../types";
import { Button, PreviewBottom, PreviewButton2, PreviewContainer, PreviewLeft, PreviewMid, PreviewRight, PreviewRow, PreviewTop } from "./styles";
import { ReactComponent as SectionSVG } from '../../../assets/svg/folder.svg'
import { ReactComponent as NoteCreatedSVG } from '../../../assets/svg/calendar-add.svg'
import { ReactComponent as NoteModifiedSVG } from '../../../assets/svg/calendar-edit.svg'
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as RemoveSVG } from '../../../assets/svg/trash.svg'
import { ReactComponent as SectionOpenSVG } from '../../../assets/svg/folder-open.svg'
import styled, { useTheme } from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { removeSection, updateSection } from "../../../redux/calls/sections_calls";


const Button2 = styled(Button)`
  flex-grow: 1;
`

interface Props {
  section: ISection,
  selected: boolean
}

// Todo
// [x] delete
// share icon, dummy for now

const SectionPreview = (props: Props) => {
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
    updateSection(dispatch, {...props.section, favorite: !props.section.favorite})
  }

  const handleNavigate = () => {
    navigate(`/sections/${props.section.id}`)
  }

  const handleRemove = () => {
    if (!canRemove) {
      setRemove(!canRemove)
    }
    else {
      removeSection(dispatch, props.section.id)
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
        <SectionSVG width={40} height={40} style={{minWidth: '40px', minHeight: '40px'}}/>
        <span>{props.section.name}</span>
      </PreviewTop>
      <PreviewMid>
        <PreviewLeft>
          <PreviewRow>
            <NoteModifiedSVG />
            <LocalTime timestamp={props.section.modified}/>
          </PreviewRow>
          <PreviewRow>
            <NoteCreatedSVG />
            <LocalTime timestamp={props.section.timestamp}/>
          </PreviewRow>
        </PreviewLeft>
        <PreviewRight>
          <PreviewButton2
            onClick={() => handleNavigate()}
            as={motion.button}
            whileHover={{cursor: 'pointer', scale: 1.05}}
            whileTap={{cursor: 'pointer', scale: 0.95}}>
            <SectionOpenSVG width={32} height={32} />
          </PreviewButton2>
        </PreviewRight>
      </PreviewMid>
      <PreviewBottom>
        <PreviewButton2
          onClick={() => handleFavorite()}
          as={motion.button}
          whileHover={{cursor: 'pointer', scale: 1.05}}
          whileTap={{cursor: 'pointer', scale: 0.95}}
        >
          <FavoriteSVG fill={props.section.favorite ? theme.sub : 'none'}/>
        </PreviewButton2>
        <Button2
          onClick={() => handleRemove()}
          as={motion.button}
          whileHover={{cursor: 'pointer', scale: 1.05}}
          whileTap={{cursor: 'pointer', scale: 0.95}}
        >
          {canRemove ? <span>Confirm</span>: null}
          <RemoveSVG />
        </Button2>
      </PreviewBottom>
    </PreviewContainer>
  )
}

export default SectionPreview;
