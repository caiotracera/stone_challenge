import React from 'react';

import Sidebar from '../../components/Sidebar';
import ProfileContainer from '../../components/ProfileContainer';

import { Container, Content } from './styles';

const Profile: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <ProfileContainer />
      </Content>
    </Container>
  );
};

export default Profile;
