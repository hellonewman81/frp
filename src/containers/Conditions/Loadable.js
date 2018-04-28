import React from 'react';
import Loadable from 'react-loadable';

const ConditionsLoadable = Loadable({
  loader: () => import('./Conditions'),
  loading: () => <div>Loading</div>
});

export default ConditionsLoadable;
