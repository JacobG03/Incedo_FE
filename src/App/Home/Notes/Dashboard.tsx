import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { IGetStatus, IState } from "../../../types";
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as ReverseSVG } from '../../../assets/svg/arrow-3.svg'


const Container = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  filter: var(--shadow);
`

interface Props {
  children: JSX.Element
  parent_id?: number | null
}

const Dashboard = (props: Props) => {
  const [favorite, setFavorite] = useState(false)
  const [sort, setSort] = useState('timestamp')
  const [reverse, setReverse] = useState(false)

  const theme = useTheme()

  const notes_status = useSelector<IState, IGetStatus>(state => state.notes.fetchNotes)
  const sections_status = useSelector<IState, IGetStatus>(state => state.sections.fetchSections)

  const options = {
    favorite: favorite,
    sort: sort,
    reverse: reverse
  }

  if (!notes_status.finished || !sections_status.finished) {
    return <h1>Loading</h1>
  }
  return (
    <>
      <Container>
        <FavoriteSVG
          onClick={() => setFavorite(!favorite)}
          fill={favorite ? theme.main : 'none'}
          style={{ color: favorite ? theme.main : 'inherit' }}
        />
        <span 
          onClick={() => setSort('timestamp')}
          style={{color: sort === 'timestamp' ? theme.main: 'inherit'}}
        >Created</span>
        <span 
          onClick={() => setSort('modified')}
          style={{color: sort === 'modified' ? theme.main: 'inherit'}}
        >Recent</span>
        <ReverseSVG
          onClick={() => setReverse(!reverse)}
          style={{ color: reverse ? theme.main : 'inherit' }}
        />
      </Container>
      {React.cloneElement(props.children, {
        options: options,
        parent_id: props.parent_id ? props.parent_id : null
      })}
    </>
  )
}

export default Dashboard;
