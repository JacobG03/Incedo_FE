import { motion } from "framer-motion";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const animations = {
  initial: { opacity: 0},
  animate: { opacity: 1},
  exit: { opacity: 0 }
}

const AnimatedPage = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <Container
      as={motion.div}
      transition={{ duration: 0.3 }}
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </Container>
  )
}

export default AnimatedPage;
