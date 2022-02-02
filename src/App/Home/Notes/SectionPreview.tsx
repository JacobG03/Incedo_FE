import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocalTime from "../../../shared/LocalTime";
import { ISection } from "../../../types";
import { PreviewContainer } from "./styles";


interface Props {
  section: ISection,
  selected: boolean
}

const SectionPreview = (props: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (props.selected) {
        if (e.keyCode === 13) {
          navigate(`/sections/${props.section.id}`)
        }
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [props.selected, props.section.id, navigate])

  return (
    <PreviewContainer selected={props.selected}>
      <h2>Section</h2>
      {props.selected ? <span>Selected!</span>: null}
      <span>id: {props.section.id}</span>
      <h2 onClick={() => navigate(`/sections/${props.section.id}`)}>Navigate</h2>
      <span>favorite: {props.section.favorite}</span>
      <span>modified: <LocalTime timestamp={props.section.modified} /> </span>
      <span>created: <LocalTime timestamp={props.section.timestamp} /></span>
      <span>title: {props.section.name}</span>
      <span>parent_id: {props.section.parent_id}</span>
    </PreviewContainer>
  )
}

export default SectionPreview;
