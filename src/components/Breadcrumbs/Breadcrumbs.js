import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { BASE_URL_MAGENTO } from '../../constants';

export default class Breadcrumbs extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <nav aria-label="breadcrumb">
        <Breadcrumb className="bg-white px-0 font-size-0875 mb-0 mb-md-2">
          {items &&
            items.map((item, idx) => (
              <BreadcrumbItem
                itemProp={`${items.length !== idx + 1 && 'child'}`}
                itemType="http://data-vocabulary.org/Breadcrumb"
                active={items.length === idx + 1}
                key={`bc-${item.url}`}
              >
                {items.length !== idx + 1 ? (
                  <a href={`${idx === 0 ? BASE_URL_MAGENTO : `/${item.url}`}`}>{item.label}</a>
                ) : (
                  <span>
                    <b>{item.label}</b>
                  </span>
                )}
              </BreadcrumbItem>
            ))}
        </Breadcrumb>
      </nav>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};
