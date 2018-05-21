import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import { Breadcrumbs, View, YouTubePlayer } from 'components';

const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === 'services') return `/services/${doc.uid}`;
  if (doc.type === 'blog') return `/blog/${doc.uid}`;
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
@connect(
  state => ({
    page: state.page.data.data,
    breadcrumbs: [
      {
        url: '/',
        label: 'Home'
      },
      {
        url: state.page.data.data.url_path,
        label: state.page.data.data.url_path === 'services' ? 'Services' : 'Blog'
      },
      {
        url: null,
        label: state.page.data.data.title[0].text
      }
    ]
  }),
  {}
)
export default class Page extends Component {
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
    const { page } = this.props;
    return (
      <View contaainer={false}>
        {page ? (
          <div className="pt-md-2">
            <Helmet
              title={page.title[0].text}
              meta={[{ name: 'description', content: 'Foot Right Podiatry' }]}
            />
            <Container>
              <Breadcrumbs items={this.props.breadcrumbs} />

              {page.path}
            </Container>
            <Container>
              <Row>
                <Col xs={12} md={12} lg={{ size: 8, order: 1, offset: 2 }}>
                  <div className="my-4">{RichText.render(page.title, linkResolver)}</div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={{ size: 8, order: 1, offset: 2 }}>
                  {page.image && (
                    <img
                      src={page.image.url}
                      alt={page.image.alt}
                      style={{ maxWidth: '100%' }}
                      className="mb-3"
                    />
                  )}
                </Col>

                <Col xs={12} md={12} lg={{ size: 8, order: 1, offset: 2 }}>
                  {page.youtube_id &&
                    <YouTubePlayer id={page.youtube_id} />
                  }
                </Col>

                <Col xs={12} md={12} lg={{ size: 8, order: 1, offset: 2 }}>
                  <div className="lead">{RichText.render(page.overview, linkResolver)}</div>
                  <div>{RichText.render(page.body, linkResolver)}</div>
                </Col>
              </Row>

              <Row className="my-5 text-center">
                <Col xs={12}>
                  <a
                    className="btn btn-outline-primary btn-xl d-block d-md-inline-block text-uppercase m-1"
                    href="/contact"
                  >
                    Contact Us
                  </a>
                  <a
                    className="btn btn-primary btn-xl d-block d-md-inline-block text-uppercase mx-1"
                    href="/booking"
                  >
                    Book Appointment
                  </a>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <Row>Unable to load product</Row>
        )}
      </View>
    );
  }
}
