import styled from "styled-components";


const Wrapper = styled.div<{ width: number }>`
  width: 100%;
  max-width: ${p => p.width}px;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: auto;
`

export default Wrapper;