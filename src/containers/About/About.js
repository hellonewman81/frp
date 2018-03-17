import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import View from 'components/View/View';
// import ModalLink from 'components/ModalLink/ModalLink';

const AnyReactComponent = ({ text, styles }) => (
  <div className={styles.greatPlaceStyle}>{text}</div>
);

const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === 'services') return `/services/${doc.uid}`;
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
    page: state.page.data.data
  }),
  {}
)
export default class About extends Component {
  static propTypes = {
    page: PropTypes.shape({
      breadcrumbs: PropTypes.any,
      children: PropTypes.array,
      description: PropTypes.objectOf(PropTypes.any),
      id: PropTypes.number,
      urlPath: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    changeVid: null,
    center: [-33.7774822, 151.0498696],
    zoom: 12,
    greatPlaceCoords: { lat: -33.7774822, lng: 151.0498696 }
  };

  render() {
    const { page } = this.props;
    const styles = require('./About.scss');
    return (
      <View contaainer={false}>
        {page ? (
          <div>
            <Helmet
              title="Foot Right Podiatry"
              meta={[{ name: 'description', content: 'Foot Right Podiatry' }]}
            />
            {/* page.image &&
              <img src={page.image.url} alt={page.image.alt} style={{ maxWidth: '100%' }} />
            */}

            <header className="masthead" style={{ backgroundImage: `url(${page.hero_image.url})` }}>
              <div className="container">
                <div className="intro-text">
                  <div className="intro-lead-in">About</div>
                  <div className="intro-heading text-uppercase">Foot Right Podiatry</div>
                  <a
                    className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
                    href="#services"
                  >
                    Services
                  </a>{' '}
                  <a
                    className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
                    href="#services"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </header>

            <section className="py-7 bg-light">
              <Container className="my-5">{RichText.render(page.body, linkResolver)}</Container>
            </section>

            <section id="about">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Our Practitioners</h2>
                    <h3 className="section-subheading text-muted">Meet the team.</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <ul className="timeline">
                      {page.practitioners &&
                        page.practitioners.map((item, idx) => (
                          <li className={idx % 2 === 0 ? 'timeline-inverted' : ''}>
                            <div className="timeline-image">
                              <img
                                className="rounded-circle img-fluid"
                                src="img/about/1.jpg"
                                alt=""
                              />
                            </div>
                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                <h4>{RichText.render(item.name, linkResolver)}</h4>
                                <div className="subheading">
                                  {RichText.render(item.lead, linkResolver)}
                                </div>
                              </div>
                              <div className="timeline-body">
                                <p className="text-muted">
                                  {RichText.render(item.blurb, linkResolver)}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Row>Unable to load page</Row>
        )}
      </View>
    );
  }
}
