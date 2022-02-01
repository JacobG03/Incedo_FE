import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LocalTime from "../../../shared/LocalTime";
import { Container } from "../../../shared/styles";
import { ISection } from "../../../types";


const Container2 = styled(Container)`
  width: fit-content;
  flex-direction: column;
`

const SectionPreview = (props: { section: ISection }) => {
  const navigate = useNavigate()

  return (
    <Container2>
      <h2>Section</h2>
      <span>id: {props.section.id}</span>
      <h2 onClick={() => navigate(`/sections/${props.section.id}`)}>Navigate</h2>
      <span>favorite: {props.section.favorite}</span>
      <span>modified: <LocalTime timestamp={props.section.modified} /> </span>
      <span>created: <LocalTime timestamp={props.section.timestamp} /></span>
      <span>title: {props.section.name}</span>
      <span>parent_id: {props.section.parent_id}</span>
    </Container2>
  )
}

export default SectionPreview;
