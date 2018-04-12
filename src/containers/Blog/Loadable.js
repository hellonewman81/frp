import React from 'react';
import Loadable from 'react-loadable';

const BlogLoadable = Loadable({
  loader: () => import('./Blog'),
  loading: () => <div>Loading</div>
});

export default BlogLoadable;
