import React from 'react';
import Loadable from 'react-loadable';

const ContactLoadable = Loadable({
  loader: () => import('./Contact'),
  loading: () => <div>Loading</div>
});

export default ContactLoadable;
