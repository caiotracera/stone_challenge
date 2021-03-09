import React from 'react';

import Sidebar from '../../components/Sidebar';
import ComicDetailContainer from '../../components/ComicDetail';

import { Container, Content } from './styles';

const ComicDetail: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <ComicDetailContainer />
      </Content>
    </Container>
  );
};

export default ComicDetail;
