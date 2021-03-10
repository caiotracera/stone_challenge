import React from 'react';

import FavoritesBox from '../../components/FavoritesBox';
import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';

const Favorites: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <FavoritesBox />
      </Content>
    </Container>
  );
};

export default Favorites;
