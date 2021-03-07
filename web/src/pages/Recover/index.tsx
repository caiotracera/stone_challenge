import Logo from '../../assets/images/logo.svg';
import RecoverBox from '../../components/RecoverBox';

import { Container, LeftContainer, RightContainer } from './styles';

const Recover: React.FC = () => {
  return (
    <div className="container">
      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <RecoverBox />
        </RightContainer>
      </Container>
    </div>
  );
};

export default Recover;
