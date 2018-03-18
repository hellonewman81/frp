import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import config from 'config';
import GoogleTagManager from 'helpers/googleTagManager';
import SiteHeader from 'components/SiteHeader/SiteHeader';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import ModalDisplay from 'components/ModalDisplay/ModalDisplay';

@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    buttonLabel: PropTypes.string,
    className: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    buttonLabel: 'Click me',
    className: null
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    // scroll updated pages...
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }

    // scroll when pager updated - not filters
    if (
      this.props.location.state &&
      this.props.location.state.page &&
      prevProps.location.state &&
      prevProps.location.state.page &&
      this.props.location.state.page !== prevProps.location.state.page
    ) {
      window.scrollTo(0, 0);
    }

    // scroll when pager updated - not filters
    if (
      this.props.location.state &&
      this.props.location.state.page &&
      !prevProps.location.state &&
      this.props.location.state.page !== 1
    ) {
      window.scrollTo(0, 0);
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { route } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <GoogleTagManager gtmId="GTM-5HCXLLR" />
        <SiteHeader />
        <div className={styles.appContent}>{renderRoutes(route.routes)}</div>
        <ModalDisplay className="modal-lg" />
        <SiteFooter />
      </div>
    );
  }
}
