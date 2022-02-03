import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { IGetStatus, IState } from "../../../types";
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as ReverseSVG } from '../../../assets/svg/arrow-3.svg'
import { motion } from "framer-motion";


const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  filter: var(--shadow);
`

const Top = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  font-size: 1.2rem;
`

const Option = styled.div<({ $highlight: boolean }) >`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$highlight ? p.theme.main : p.theme.sub};
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
    <Container>
      <Top>
        <Option
          onClick={() => setFavorite(!favorite)}
          $highlight={favorite}
          as={motion.div}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FavoriteSVG fill={favorite ? theme.main : 'none'} />
        </Option>
        <Option
          onClick={() => setSort('timestamp')}
          $highlight={sort === 'timestamp'}
          as={motion.div}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Created</span>
        </Option>
        <Option
          onClick={() => setSort('modified')}
          $highlight={sort === 'modified'}
          as={motion.div}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Recent</span>
        </Option>
        <Option
          onClick={() => setReverse(!reverse)}
          $highlight={reverse}
          as={motion.div}
          whileHover={{ cursor: 'pointer', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ReverseSVG />
        </Option>
      </Top>
      {React.cloneElement(props.children, {
        options: options,
        parent_id: props.parent_id ? props.parent_id : null
      })}
    </Container>
  )
}

export default Dashboard;
