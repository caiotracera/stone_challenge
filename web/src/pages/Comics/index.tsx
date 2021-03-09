import React from 'react';

import ComicsBox from '../../components/ComicsBox';
import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';

const Comics: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <ComicsBox />
      </Content>
    </Container>
  );
};

export default Comics;
