import axios from '../../../services/index'
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Editor from "../../../shared/Editor";
import AnimatedPage from "../AnimatePage";
import { setNote } from '../../../redux/slices/notesSlice';
import { useDispatch } from 'react-redux';
import { INote } from '../../../types';
import { addAlert } from '../../../redux/slices/alertsSlice';


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: var(--border-radius2);
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
`

const Options = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  justify-content: space-evenly;
  color: ${p => p.theme.main};
`

const Note = () => {
  const [data, setData] = useState<INote | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [mounted, setMount] = useState(true)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    axios.get(location.pathname)
      .then(res => {
        dispatch(setNote(res.data))
        setData(res.data)
      })
      .catch(error => console.log(error.response.data.detail))
    
    return () => setMount(false)
  }, [dispatch, location])

  const handleSave = () => {
    axios.put(location.pathname, data)
    .then(res => {
      dispatch(setNote(res.data))
    })
    .catch(error => console.log(error.response.data.detail))
  }

  const handleDelete = () => {
    axios.delete(location.pathname)
    .then(res => {
      dispatch(addAlert({message: 'Note deleted.'}))
      navigate('/notes')
    })
    .catch(error => console.log(error.response.data.detail))
  }
  
  const handleChange = useCallback((state: string) => {
    if (data && mounted) {
      let new_data = data
      new_data.body = state
      setData(new_data)
    }
  }, [data, mounted])

  if (!data) {
    return null
  }

  return (
    <Container>
      <Options>
        <span onClick={() => navigate('/notes')}>Back</span>
        <span onClick={() => setPreview(!preview)}>Preview</span>
        <span onClick={() => handleSave()}>Save</span>
        <span onClick={() => handleDelete()}>Delete</span>
      </Options>
      <Editor initialDoc={data.body} preview={preview} onChange={handleChange} />
    </Container>
  )
}

export default Note;
