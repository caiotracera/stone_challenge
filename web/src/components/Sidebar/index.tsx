import React, { useCallback } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { FiBookOpen, FiLogOut, FiUser } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/all';

import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/auth';

import { Container, Navbar, Footer } from './styles';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const history = useHistory();

  const handleProfileClick = useCallback(() => {
    history.push('/profile');
  }, [history]);

  return (
    <Container>
      <img src={logoImg} alt="Logo" className="logo" />
      <Navbar>
        <NavLink to="/dashboard/characters" activeClassName="active">
          <FiUser size={24} color="#fff" />
          <p>Characters</p>
        </NavLink>
        <NavLink to="/dashboard/comics" activeClassName="active">
          <FiBookOpen size={24} color="#fff" />
          <p>Comics</p>
        </NavLink>
        <NavLink to="/dashboard/favorites" activeClassName="active">
          <AiFillStar size={24} color="#fff" />
          <p>Favorites</p>
        </NavLink>
      </Navbar>
      <Footer>
        <img src={user.avatar_url} alt="avatar" onClick={handleProfileClick} />
        <h3>{user.username}</h3>
        <FiLogOut size={16} onClick={signOut} />
      </Footer>
    </Container>
  );
};

export default Sidebar;
