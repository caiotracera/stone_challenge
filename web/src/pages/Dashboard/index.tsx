import React from 'react';

import CharactersBox from '../../components/CharactersBox';
import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CharactersBox />
      </Content>
    </Container>
  );
};

export default Dashboard;
