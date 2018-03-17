import React from 'react';
import Loadable from 'react-loadable';

const BookingLoadable = Loadable({
  loader: () => import('./Booking'),
  loading: () => <div>Loading</div>
});

export default BookingLoadable;
