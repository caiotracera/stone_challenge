import logoImg from '../../assets/images/logo.svg';
import RegisterBox from '../../components/RegisterBox';

import { Container, LeftContainer, RightContainer } from './styles';

const SignUp: React.FC = () => {
  return (
    <div className="container">
      <Container>
        <LeftContainer>
          <img src={logoImg} alt="Logo" />
        </LeftContainer>
        <RightContainer>
          <RegisterBox />
        </RightContainer>
      </Container>
    </div>
  );
};

export default SignUp;
