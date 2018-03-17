import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

export default class View extends React.Component {
  static propTypes = {
    children: PropTypes.objectOf(PropTypes.any).isRequired,
    container: PropTypes.bool,
    breadcrumbs: PropTypes.oneOfType([PropTypes.any, PropTypes.bool])
  };

  static defaultProps = {
    container: false,
    breadcrumbs: false
  };

  render() {
    const { children, container, breadcrumbs } = this.props;
    return (
      <div>
        {breadcrumbs && (
          <Container>
            <Breadcrumbs items={breadcrumbs} />
          </Container>
        )}
        {container ? <Container>{children}</Container> : <div>{children}</div>}
      </div>
    );
  }
}
