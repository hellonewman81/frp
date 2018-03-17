import React from 'react';
import Loadable from 'react-loadable';

const ServicesLoadable = Loadable({
  loader: () => import('./Services'),
  loading: () => <div>Loading</div>
});

export default ServicesLoadable;
