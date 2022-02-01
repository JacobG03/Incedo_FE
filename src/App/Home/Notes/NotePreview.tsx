import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { Container } from "../../../shared/styles";
import { INote } from "../../../types";


const Container2 = styled(Container)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 240px;
  height: 240px;
  flex-direction: column;
`

const NotePreview = (props: { note: INote }) => {
  const navigate = useNavigate()

  // Todo
  // delete
  // favorite
  // share icon, dummy for now

  return (
    <Container2>
      <h2 onClick={() => console.log('yo')}>Note</h2>
      <span>id: {props.note.id}</span>
      <span onClick={() => navigate(`/notes/${props.note.id}`)}>Navigate</span>
      <span>favorite: {props.note.favorite}</span>
      <span>modified: <LocalTime timestamp={props.note.modified} /> </span>
      <span>created: <LocalTime timestamp={props.note.timestamp} /></span>
      <span>title: {props.note.title}</span>
      <span>parent_id: {props.note.parent_id}</span>
    </Container2>
  )
}

export default NotePreview;
