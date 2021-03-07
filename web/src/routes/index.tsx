import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" component={SignUp} />
    <Route path="/forgot" component={Forgot} />
  </Switch>
);

export default Routes;
