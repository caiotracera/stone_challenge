import React from 'react';
import Logo from '../../assets/images/logo.svg';
import ForgotBox from '../../components/ForgotBox';

import { Container, LeftContainer, RightContainer } from './styles';

const Forgot: React.FC = () => {
  return (
    <div className="container">
      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <ForgotBox />
        </RightContainer>
      </Container>
    </div>
  );
};

export default Forgot;
