import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import useCodeMirror from './use-codemirror'
import { useRemark } from 'react-remark';
import { ReactComponent as AddSVG } from '../assets/svg/add-circle.svg'
import { ReactComponent as MinusSVG } from '../assets/svg/minus-circle.svg'
import { Button } from './styles';
import { m } from 'framer-motion';


const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Options = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 1rem;
  font-size: 1.5rem;
`

const Content = styled.div<({ fontSize: number }) >`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-direction: column;
  font-size: ${p => p.fontSize}rem;
  background-color: rgba(0,0,0,0.2);
  border-radius: var(--border-radius);
`

const MarkDown = styled.div`
  width: 100%;
  height: fit-content;
  color: ${p => p.theme.text};
`

const Preview = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.bg};
  padding: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
`


interface Props {
  initialDoc: string,
  preview: boolean,
  onChange: (doc: string) => void
}


const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props
  const [reactContent, setMarkdownSource] = useRemark();
  const [fontSize, setFontSize] = useState(1)

  const handleChange = useCallback(
    state => {
      onChange(state.doc.toString())
      setMarkdownSource(state.doc.toString())
    },
    [onChange, setMarkdownSource]
  )

  const [refContainer] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange
  })

  const biggerFont = () => {
    setFontSize(fontSize + 0.1)
  }

  const smallerFort = () => {
    if (fontSize > 0.3) {
      setFontSize(fontSize - 0.1)
    }
  }

  return (
    <Container>
      <Content fontSize={fontSize}>
        <Options>
          <Button
            onClick={() => biggerFont()}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            <AddSVG />
          </Button>
          <Button
            onClick={() => smallerFort()}
            as={m.button}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
          >
            <MinusSVG />
          </Button>
          <span>{fontSize.toFixed(1)}x</span>
        </Options>
        <MarkDown ref={refContainer} style={props.preview ? { display: 'none' } : {}}></MarkDown>
        {props.preview ? <Preview>{reactContent}</Preview> : null}
      </Content>
    </Container>
  )
}

export default Editor