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
  initial: {y: -50, opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: -50, opacity: 0}
}

const AnimatedPage = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <Container
      as={motion.div}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
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
