import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Content, Cover, FixedContainer, Title } from '../../shared/styles';
import Wrapper from '../../shared/Wrapper';
import ResetPassForm from './ResetPassForm';


const ResetPass = () => {
  useEffect(() => {
    document.title = 'Reset Password | Incedo'
  }, [])

  return (
    <FixedContainer>
      <Wrapper width={480}>
        <Content>
          <Cover
            as={motion.div}
            key={'reset-pass-cover'}
            animate={{ y: "-76px", height: '60px', transition: { duration: 0.6 } }}
          >
            <Title>Reset Password</Title>
          </Cover>
          <ResetPassForm />
        </Content>
      </Wrapper>
    </FixedContainer>
  )
}

export default ResetPass;
