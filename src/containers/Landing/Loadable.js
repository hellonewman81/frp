import React from 'react';
import Loadable from 'react-loadable';

const PageLoadable = Loadable({
  loader: () => import('./Landing'),
  loading: () => <div>Loading</div>
});

export default PageLoadable;
