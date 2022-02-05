import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { IGetStatus, IState } from "../../../types";
import { ReactComponent as FavoriteSVG } from '../../../assets/svg/star.svg'
import { ReactComponent as ReverseSVG } from '../../../assets/svg/arrow-3.svg'
import { motion } from "framer-motion";
import { Content } from "../../../shared/styles";


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
  background-color: ${p => p.theme.bg};
  color: ${p => p.theme.sub};
  filter: var(--shadow);
`

const Top = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  font-size: 1.2rem;
  outline: none;
`

const Option = styled.button<({ $highlight: boolean }) >`
  flex-grow: 1;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$highlight ? p.theme.main : p.theme.sub};
  font-weight: ${p => p.$highlight ? 700: 300};
  border: none;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
  
  &:focus {
    color: ${p => p.theme.main};
    outline: 1px solid ${p => p.theme.main};
    font-weight: 700;
  }
`

const Content2 = styled(Content)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
  gap: 0.5rem;
`

interface Props {
  selected: boolean,
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

  const topRef = useRef<HTMLDivElement>(null)

  const keyDownHandler = (e: any) => {
    // only execute if tab is pressed
    if (e.key !== 'Tab') return

    // here we query all focusable elements, customize as your own need
    if (topRef.current) {
      const focusableModalElements = topRef.current.querySelectorAll(
        'button'
      )

      const firstElement = focusableModalElements[0]
      const lastElement = focusableModalElements[focusableModalElements.length - 1]

      // if going forward by pressing tab and lastElement is active shift focus to first focusable element 
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      // if going backward by pressing tab and firstElement is active shift focus to last focusable element 
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    }
  }

  useEffect(() => {
    topRef.current?.addEventListener('keydown', keyDownHandler)

    if (topRef.current && props.selected) {
      // scroll into view
      topRef.current.tabIndex = -1
      let buttons = topRef.current.querySelectorAll('button')
      buttons[0].focus()
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [topRef, props.selected])

  if (!notes_status.finished || !sections_status.finished) {
    return <h1>Loading</h1>
  }

  return (
    <Container>
      <Top ref={topRef}>
        <Content2>
          <Option
            onClick={() => setFavorite(!favorite)}
            $highlight={favorite}
            as={motion.button}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            name='Filter by favorite'
          >
            <FavoriteSVG fill={favorite ? theme.main : 'none'} />
          </Option>
          <Option
            onClick={() => setSort('timestamp')}
            $highlight={sort === 'timestamp'}
            as={motion.button}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            name='Sort by created'
          >
            <span>Created</span>
          </Option>
          <Option
            onClick={() => setSort('modified')}
            $highlight={sort === 'modified'}
            as={motion.button}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            name='Sort by recent'
          >
            <span>Recent</span>
          </Option>
          <Option
            onClick={() => setReverse(!reverse)}
            $highlight={reverse}
            as={motion.button}
            whileHover={{ cursor: 'pointer', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            name='Reverse sort'
          >
            <ReverseSVG />
          </Option>
        </Content2>
      </Top>
      {React.cloneElement(props.children, {
        options: options,
        parent_id: props.parent_id ? props.parent_id : null
      })}
    </Container>
  )
}

export default Dashboard;
