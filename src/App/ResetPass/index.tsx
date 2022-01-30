import { useEffect } from 'react';
import CoverAnimate from '../../shared/CoverAnimate';
import { FixedContainer } from '../../shared/styles';
import Wrapper from '../../shared/Wrapper';
import ResetPassForm from './ResetPassForm';


const ResetPassPage = () => {
  useEffect(() => {
    document.title = 'Reset Password | Incedo'
  }, [])

  return (
    <FixedContainer>
      <Wrapper width={480}>
        <CoverAnimate>
          <ResetPassForm />
        </CoverAnimate>
      </Wrapper>
    </FixedContainer>
  )
}

export default ResetPassPage;
