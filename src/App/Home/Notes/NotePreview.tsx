import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../../types";
import { PreviewContainer } from "./styles";
import { ReactComponent as NoteSVG } from '../../../assets/svg/stickynote.svg'
import { ReactComponent as NoteCreatedSVG } from '../../../assets/svg/calendar-add.svg'
import { ReactComponent as NoteModifiedSVG } from '../../../assets/svg/calendar-edit.svg'
import { ReactComponent as EditSVG } from '../../../assets/svg/edit.svg'
import styled from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { motion } from "framer-motion";


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

const EditButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  filter: var(--shadow);
  
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
  justify-content: space-evenly;
`

interface Props {
  note: INote,
  selected: boolean
}

// Todo
// [x] delete
// favorite
// share icon, dummy for now

const NotePreview = (props: Props) => {
  const navigate = useNavigate()
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (props.selected) {
        if (e.keyCode === 13) {
          navigate(`/notes/${props.note.id}`)
        }
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [props.selected, props.note.id, navigate])

  useEffect(() => {
    if (props.selected && previewRef.current) {
      previewRef.current.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
      previewRef.current.tabIndex = -1
      previewRef.current.focus()
    }
  }, [props.selected, previewRef])

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
          <EditButton
            onClick={() => navigate(`/notes/${props.note.id}`)}
            as={motion.button}
            whileHover={{cursor: 'pointer', scale: 1.05}}
            whileTap={{cursor: 'pointer', scale: 0.95}}
          >
            <EditSVG width={32} height={32} />
          </EditButton>
        </Right>
      </Mid>
      <Bottom>

      </Bottom>
    </PreviewContainer>
  )
}

export default NotePreview;
