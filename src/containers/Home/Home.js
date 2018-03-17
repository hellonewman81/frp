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
export default class Home extends Component {
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
  //  https://www.google.com.au/maps/dir/''/Foot+Right+Podiatry,+Shop+1044B,+level+1+upper,+Macquarie+Shopping+Centre,+Macquarie+Park+NSW+2113/@11.98z/data=!4m8!4m7!1m0!1m5!1m1!1s0x6b12a60db3ffffff:0xa7c7c0221f9308cf!2m2!1d151.121023!2d-33.7769179
  render() {
    const { page } = this.props;
    const styles = require('./Home.scss');
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
            <header className="masthead">
              <div className="container">
                <div className="intro-text">
                  <div className="intro-lead-in">Welcome To</div>
                  <div className="intro-heading text-uppercase">Foot Right Podiatry</div>
                  <a className="btn btn-primary btn-xl text-uppercase mr-3" href="/services">
                    Our Services
                  </a>
                  <a className="btn btn-primary btn-xl text-uppercase ml-3" href="/booking">
                    Book Appointment
                  </a>
                </div>
              </div>
            </header>
            <section id="services">
              <div className="container">
                {/*
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Xdsad da dsas</h2>
                    <h3 className="section-subheading text-muted">dsadsa</h3>
                  </div>
                </div>
                */}
                <div className="row text-center">
                  <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-map-marker fa-stack-1x fa-inverse" />
                    </span>
                    <h4 className="service-heading">Location</h4>
                    <p className="text-muted">
                      Foot Right Podiatry is the leading Podiatry practice in Sydney's Macquarie
                      Park. It is conveniently located within Macquarie Health Professionals - an
                      allied health clinic located at Macquarie Shopping Centre.
                    </p>
                  </div>
                  <div className="col-md-4">
                    {/**/}
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-star fa-stack-1x fa-inverse" />
                    </span>

                    <h4 className="service-heading">Commitment</h4>
                    <p className="text-muted">
                      We are absolutely committed to providing first class care in a warm and
                      professional environment. We aim to work together with our clients, focusing
                      on the individual's needs and health goals, so that we can achieve the best
                      outcomes possible.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-plus fa-stack-1x fa-inverse" />
                    </span>

                    <h4 className="service-heading">Culture</h4>
                    <p className="text-muted">
                      Our culture of professional development and continuing education ensures you
                      will always receive the most up to date and evidence based treatments. Our
                      podiatrists regularly attend conferences, courses and in-house education
                      sessions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/*
            <Container className="my-5">
              {RichText.render(page.body, linkResolver)}
            </Container>
            */}
            <section className="bg-light" id="portfolio">
              <Container>
                <Row className="mb-5">
                  <Col xs={12} className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Some of our common services</h3>
                  </Col>
                </Row>
                <Row>
                  {page.home_teaser &&
                    page.home_teaser.map(item => (
                      <div className="col-md-4 col-sm-6 portfolio-item">
                        <a className="portfolio-link" href={Link.url(item.url, linkResolver)}>
                          <div className="portfolio-hover">
                            <div className="portfolio-hover-content">
                              <i className="fa fa-plus fa-3x" />
                            </div>
                          </div>
                          <img className="img-fluid" src={item.thumb.url} alt="" />
                          <div className="portfolio-caption">
                            {RichText.render(item.title, linkResolver)}
                            <p className="text-muted">{RichText.render(item.body, linkResolver)}</p>
                          </div>
                        </a>
                      </div>
                    ))}
                </Row>
                <p className="text-center">
                  <a className="btn btn-primary btn-xl text-uppercase" href="/services">
                    See All Services
                  </a>
                </p>
              </Container>
            </section>
            <section className="bg-primary py-0" id="location">
              <Row>
                <Col xs={12} sm={6} lg={7} className="text-center">
                  <div className={styles.mapWrapper}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyBPFCPdNnMJNWtZqEbLWUjZj27YyJ4N3AI' }}
                      defaultCenter={this.props.center}
                      defaultZoom={this.props.zoom}
                    >
                      <AnyReactComponent
                        lat={-33.7774822}
                        lng={151.0498696}
                        text="Foot Right Podiatry"
                        styles={styles}
                      />
                    </GoogleMapReact>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={5} className="py-5 float-left">
                  <h2 className="section-heading h4 mb-4">Location</h2>
                  {/* <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> */}
                  <p>
                    Foot Right Podiatry, Shop 1044B <br />
                    level 1 upper, Macquarie Shopping Centre <br />
                    Macquarie Park, NSW 2113 <br />
                  </p>
                  <p>
                    <b>Phone:</b> (02) 9887 2270{' '}
                  </p>
                </Col>
              </Row>
              <Row />
            </section>
            Newsletter signup:
          </div>
        ) : (
          <Row>
            Unable to load product
            <section id="services">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Some of our common services</h3>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-shopping-cart fa-stack-1x fa-inverse" />
                    </span>
                    <h4 className="service-heading">E-Commerce</h4>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
                      architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-laptop fa-stack-1x fa-inverse" />
                    </span>
                    <h4 className="service-heading">Responsive Design</h4>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
                      architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                      <i className="fa fa-circle fa-stack-2x text-primary" />
                      <i className="fa fa-lock fa-stack-1x fa-inverse" />
                    </span>
                    <h4 className="service-heading">Web Security</h4>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
                      architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section />
          </Row>
        )}
      </View>
    );
  }
}
