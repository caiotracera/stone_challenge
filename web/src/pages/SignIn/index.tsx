import logoImg from '../../assets/images/logo.svg';

import { Container, LeftContainer, RightContainer } from './styles';
import LoginBox from '../../components/LoginBox';

const SignIn: React.FC = () => {
  return (
    <div className="container">
      <Container>
        <LeftContainer>
          <img src={logoImg} alt="logo" />
        </LeftContainer>
        <RightContainer>
          <LoginBox />
        </RightContainer>
      </Container>
    </div>
  );
};

export default SignIn;
