import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../../types";
import { PreviewContainer } from "./styles";


interface Props {
  note: INote,
  selected: boolean
}

const NotePreview = (props: Props) => {
  const navigate = useNavigate()

  // Todo
  // [x] delete
  // favorite
  // share icon, dummy for now
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

  return (
    <PreviewContainer selected={props.selected}>
      <span>Note</span>
    </PreviewContainer>
  )
}

export default NotePreview;
