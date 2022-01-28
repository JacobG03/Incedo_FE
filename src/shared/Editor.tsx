import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import useCodeMirror from './use-codemirror'
import { useRemark } from 'react-remark';


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
  justify-content: space-evenly;
  padding: 0.5rem;
  background-color: ${ p => p.theme.bg};
  filter: var(--shadow);
  border-radius: var(--border-radius);
`

const Content = styled.div<({fontSize: number})>`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-direction: column;
  font-size: ${p => p.fontSize}rem;
  background-color: rgba(0,0,0,0.2);
  box-shadow: var(--shadow-inner);
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
  background-color: ${ p => p.theme.bg};
  filter: var(--shadow);
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
          <span onClick={() => biggerFont()}>+</span>
          <span onClick={() => smallerFort()}>-</span>
        </Options>
        <MarkDown ref={refContainer} style={props.preview ? {display: 'none'} : {}}></MarkDown>
        {props.preview ? <Preview>{reactContent}</Preview> : null}
      </Content>
    </Container>
  )
}

export default Editor