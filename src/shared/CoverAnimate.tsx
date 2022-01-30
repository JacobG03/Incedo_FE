import { motion } from "framer-motion";
import { Content, Cover, Title } from "./styles";


interface Props {
  children: JSX.Element[] | JSX.Element
}


const CoverAnimate = ({children}: Props) => {
  return (
    <Content>
      <Cover
        as={motion.div}
        key={'register-cover'}
        transition={{ duration: 0.5 }}
        animate={{ y: "-76px", height: '60px' }}
        exit={{ y: "0px", height: '100%' }}
      >
        <Title>Incedo</Title>
      </Cover>
      {children}
    </Content>
  )
}

export default CoverAnimate;
