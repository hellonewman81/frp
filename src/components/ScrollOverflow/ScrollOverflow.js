import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from 'constants/index';

export default class ScrollOverflow extends Component {
  render() {
    const styles = require('./ScrollOverflow.scss');
    const placeHolderImg = require('../AlgoliaSearch/placeholder.jpg');
    const {
      items, urlPath, isBrand, size
    } = this.props;

    const sizeClass = styles[`grid-${size || 6}`];

    return (
      <div className={`${styles.overflowBox} ${sizeClass}`}>
        {items &&
          items.map(item => (
            <li key={`sc-${item.url}-${urlPath}`} className={`${styles.overflowBoxContent}`}>
              <div className="list">
                <a
                  className="p-2 text-center d-block link-black"
                  href={`${BASE_URL}${isBrand ? '/brands/' : '/parts/'}${urlPath &&
                    urlPath !== item.url &&
                    `${urlPath}/`}${item.url && item.url}`}
                >
                  <img
                    className={styles.overflowBoxContentImg}
                    src={`${item.thumbnail ? item.thumbnail : placeHolderImg}`}
                    alt={item.name}
                  />
                  <span className="d-block font-size-0875">{item.name}</span>
                </a>
              </div>
            </li>
          ))}
      </div>
    );
  }
}

ScrollOverflow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  urlPath: PropTypes.string.isRequired,
  isBrand: PropTypes.bool.isRequired,
  size: PropTypes.string
};

ScrollOverflow.defaultProps = {
  size: 'lg'
};
