import 'bulma/css/bulma.min.css';
import 'normalize.css/normalize.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Router, Route } from 'inferno-router';
import * as inferno from 'inferno';
import { Provider } from 'inferno-mobx';

import history from './core/history';
import store from './core/store';

import Header from 'app/components/Header';

import Home from 'app/pages/Home';
import Game from 'app/pages/Game';

if (process.env.NODE_ENV !== 'production') {
  require('app/core/hmr');
}

inferno.render(
  <Provider store={store}>
    <Router history={history}>
      <main>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/game" component={Game} />
      </main>
    </Router>
  </Provider>,

  document.getElementById('app')
);
