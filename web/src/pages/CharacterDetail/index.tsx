import React from 'react';

import Sidebar from '../../components/Sidebar';
import CharacterDetailContainer from '../../components/CharacterDetail';

import { Container, Content } from './styles';

const CharacterDetail: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CharacterDetailContainer />
      </Content>
    </Container>
  );
};

export default CharacterDetail;
