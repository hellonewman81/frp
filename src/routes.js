// import { routerActions } from 'react-router-redux';
// import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
// import { App, Home, NotFound } from 'containers';

import {
  App,
  Home,
  About,
  NotFound,
  Page,
  Booking,
  Services,
  Contact,
  Blog,
  Conditions,
  Landing
} from 'containers';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/about', exact: true, component: About },
      { path: '/services', exact: true, component: Services },
      { path: '/services/:id', exact: true, component: Page },
      { path: '/landing/:id', exact: true, component: Landing },
      { path: '/l/:id', exact: true, component: Landing },
      { path: '/blog', exact: true, component: Blog },
      { path: '/blog/:id', exact: true, component: Page },
      { path: '/conditions', exact: true, component: Conditions },
      { path: '/conditions/:id', exact: true, component: Page },
      { path: '/booking', exact: true, component: Booking },
      { path: '/contact', exact: true, component: Contact },
      { path: '/error', exact: true, component: NotFound },
      { component: NotFound }
    ]
  }
];

export default routes;
