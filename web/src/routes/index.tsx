import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';
import Recover from '../pages/Recover';
import Dashboard from '../pages/Dashboard';
import CharacterDetail from '../pages/CharacterDetail';
import Comics from '../pages/Comics';
import ComicDetail from '../pages/ComicDetail';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" component={SignUp} />
    <Route path="/forgot" component={Forgot} />
    <Route path="/recover" component={Recover} />

    <Route path="/dashboard" exact isPrivate component={Dashboard} />
    <Route path="/dashboard/characters" exact isPrivate component={Dashboard} />
    <Route
      path="/dashboard/characters/:id"
      isPrivate
      component={CharacterDetail}
    />

    <Route path="/dashboard/comics" exact isPrivate component={Comics} />
    <Route path="/dashboard/comics/:id" isPrivate component={ComicDetail} />

    <Route path="/dashboard/favorites" isPrivate component={Favorites} />

    <Route path="/dashboard/profile" isPrivate component={Profile} />
  </Switch>
);

export default Routes;
