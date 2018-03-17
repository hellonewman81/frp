import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import View from 'components/View/View';
import ModalLink from 'components/ModalLink/ModalLink';
import Iframe from 'react-iframe';

const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === 'service') return `/service/${doc.uid}`;
  if (doc.type === 'page') return `/${doc.uid}`;
  // Fallback for other types, in case new custom types get created
  return `/blog/${doc.id}`;
};

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, location }) => {
    if (!isPageLoaded(getState())) {
      await dispatch(loadPage(location)).catch(() => null);
    }
  }
})
export default class Booking extends Component {
  static propTypes = {
    page: PropTypes.shape({
      breadcrumbs: PropTypes.any,
      children: PropTypes.array,
      description: PropTypes.objectOf(PropTypes.any),
      id: PropTypes.number,
      urlPath: PropTypes.string,
      name: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    changeVid: null
  };

  render() {
    const {} = this.props;
    return (
      <View contaainer={false}>
        <div className="pt-md-2">
          <Helmet
            title="Foot Right Podiatry"
            meta={[{ name: 'description', content: 'Foot Right Podiatry' }]}
          />
          <Container>
            <Iframe
              url="https://machealthprof.appointment.mobi:8443/BookingGateway/Account/LogOn?ReturnUrl=%2Fbookinggateway"
              position="relative"
              width="100%"
              id="myId"
              className="myClassname"
              height="567px"
              allowFullScreen
            />
          </Container>
        </div>
      </View>
    );
  }
}
