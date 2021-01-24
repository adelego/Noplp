import React, { useMemo } from 'react';
import {
  Link,
  Redirect,
  Route,
  Router as ReactRouter,
  Switch,
} from 'react-router-dom';
import { GeniusRedirect } from '../GeniusRedirect';
import { StartGame } from '../StartGame';
import { createBrowserHistory } from 'history';

const Router = () => {
  const history = useMemo(() => createBrowserHistory(), []);
  return (
    <ReactRouter history={history}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/game">Start Game</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/redirect">
            <GeniusRedirect />
          </Route>
          <Route path="/game">
            <StartGame />
          </Route>
          <Route>
            <Redirect to="/game" />
          </Route>
        </Switch>
      </div>
    </ReactRouter>
  );
};

export default Router;
