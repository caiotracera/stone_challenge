import React, { useCallback, useState } from 'react';
import { FiBookOpen, FiLogOut, FiUser } from 'react-icons/fi';
import { useHistory, useParams, Link } from 'react-router-dom';

import { AiFillStar } from 'react-icons/all';
import logoImg from '../../assets/images/logo.svg';

import { Container, Sidebar, Navbar, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const { user, signOut } = useAuth();
  const history = useHistory();

  const handleProfileClick = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const handleChangeView = useCallback((route: string) => {
    setActiveRoute(route);
  }, []);

  return (
    <Container>
      <Sidebar>
        <img src={logoImg} alt="Logo" className="logo" />
        <Navbar>
          <div
            className={activeRoute === 'dashboard' ? 'active' : ''}
            onClick={() => handleChangeView('dashboard')}
          >
            <FiUser size={24} color="#fff" />
            <p>Characters</p>
          </div>
          <div
            className={activeRoute === 'comics' ? 'active' : ''}
            onClick={() => handleChangeView('comics')}
          >
            <FiBookOpen size={24} color="#fff" />
            <p>Comics</p>
          </div>
          <div
            className={activeRoute === 'favorites' ? 'active' : ''}
            onClick={() => handleChangeView('favorites')}
          >
            <AiFillStar size={24} color="#fff" />
            <p>Favorites</p>
          </div>
        </Navbar>
        <Footer>
          <img
            src={user.avatar_url}
            alt="avatar"
            onClick={handleProfileClick}
          />
          <h3>{user.username}</h3>
          <FiLogOut size={16} onClick={signOut} />
        </Footer>
      </Sidebar>
      <h1>hello world</h1>
    </Container>
  );
};

export default Dashboard;