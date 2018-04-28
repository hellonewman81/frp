import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import { Breadcrumbs, View } from 'components';

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
    page: state.page.data,
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
export default class Landing extends Component {
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
              title={page.data.title[0].text}
              meta={[{ name: 'description', content: 'Foot Right Podiatry' }]}
            >
              <body lId={page.uid} />
            </Helmet>
            <Container>
              <Breadcrumbs items={this.props.breadcrumbs} />
            </Container>
          </div>
        ) : (
          <Row>Unable to load product</Row>
        )}
      </View>
    );
  }
}
