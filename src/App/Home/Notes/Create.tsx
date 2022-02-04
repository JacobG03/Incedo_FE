import styled from "styled-components";
import { ReactComponent as CreateNoteSVG } from '../../../assets/svg/note-add.svg'
import { ReactComponent as CreateSectionSVG } from '../../../assets/svg/folder-add.svg'
import { motion } from "framer-motion";
import { Button } from "./styles";
import { createNote } from "../../../redux/calls/notes_calls";
import { useDispatch, useSelector } from "react-redux";
import { IState, INote, ISection } from "../../../types";
import { createSection } from "../../../redux/calls/sections_calls";


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${p => p.theme.sub};
`

const Button2 = styled(Button)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 200px;
  padding: 0.5rem;
`

interface Props {
  parent_id: number | null
}

const Create = (props: Props) => {
  const dispatch = useDispatch()

  const notes = useSelector<IState, INote[]>(state => state.notes.notes)
  const sections = useSelector<IState, ISection[]>(state => state.sections.sections)

  const handleNote = (e: any) => {
    e.target.blur()
    createNote(dispatch, {title: `Note ${notes.length}`, parent_id: props.parent_id})
  }

  const handleSection = (e: any) => {
    e.target.blur()
    createSection(dispatch, {name: `Section ${sections.length}`, parent_id: props.parent_id})
  }

  return (
    <Container>
      <Button2
        onClick={(e: any) => handleNote(e)}
        as={motion.button}
        whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 5 }}
        whileTap={{ scale: 0.95 }}>
        <CreateNoteSVG width={32} height={32} />
        <span>Create Note</span>
      </Button2>
      <Button2
        onClick={(e: any) => handleSection(e)}
        as={motion.button}
        whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 5 }}
        whileTap={{ scale: 0.95 }}>
        <CreateSectionSVG width={32} height={32} />
        <span>Create Section</span>
      </Button2>
    </Container>
  )
}

export default Create;
