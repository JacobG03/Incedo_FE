import styled from "styled-components"
import { Container } from "../../../shared/styles"
import { INote } from "../../../types"


interface Props {
  notes: INote[]
}

const MainNotes = (props: Props) => {
  return (
    <>
      {props.notes.map(note => <Note key={note.id} note={note} />)}
    </>
  )
}

const Container2 = styled(Container)`
  flex-direction: column;
`

const Note = (props: {note: INote}) => {
  return (
    <Container2>
      <span>title: {props.note.title}</span>
      <span>favorite: {props.note.favorite}</span>
      <span>id: {props.note.id}</span>
      <span>sort_id: {props.note.sort_id}</span>
      <span>parent_id: {props.note.parent_id}</span>
    </Container2>
  )
}

export default MainNotes;
