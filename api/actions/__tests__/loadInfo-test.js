import { expect } from 'chai';
import loadInfo from '../loadInfo';

describe('loadInfo', () => {
  it('loads category information', () => {
    expect(loadInfo({
      body: {
        pathname: '/brakes/',
        search: '',
        hash: '',
        key: 'o0zwna'
      }
    })).to.deep.equal({});
  });
});
