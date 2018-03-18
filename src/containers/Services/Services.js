import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, loadServices } from 'redux/modules/page';
import View from 'components/View/View';
import ModalLink from 'components/ModalLink/ModalLink';

const linkResolver = function (doc) {
  console.log(doc);

  // Pretty URLs for known types
  if (doc.type === 'services') return `/services/${doc.uid}`;
  if (doc.type === 'page') return `/${doc.uid}`;
  // Fallback for other types, in case new custom types get created
  return `/blog/${doc.id}`;
};

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, location }) => {
    if (!isPageLoaded(getState())) {
      await dispatch(loadServices(location)).catch(() => null);
    }
  }
})
@connect(
  state => ({
    page: state.page.data
  }),
  {}
)
export default class Services extends Component {
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
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
  };

  render() {
    const { page } = this.props;
    // const styles = require('./Services.scss');
    return (
      <View contaainer={false}>
        {page ? (
          <div>
            <Helmet
              title="Services | Foot Right Podiatry"
              meta={[{ name: 'Services | Foot Right Podiatry', content: 'Services | Foot Right Podiatry' }]}
            />

            <header
              className="masthead"
              style={{
                backgroundImage:
                  'url(https://prismic-io.s3.amazonaws.com/footright%2F1dd1172d-e197-4d8b-b0bf-965ab3f93a7f_services-foot-right-podiatry.png)'
              }}
            >
              <div className="container">
                <div className="intro-text">
                  <div className="intro-lead-in">Services</div>
                  <div className="intro-heading text-uppercase">Foot Right Podiatry</div>
                </div>
              </div>
            </header>

            <section className="bg-light" id="portfolio">
              <Container>
                <Row>
                  {page &&
                    page.map(item => (
                      <div className="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                        <a className="portfolio-link" href={`${linkResolver(item)}`}>
                          <div className="portfolio-hover">
                            <div className="portfolio-hover-content">
                              <i className="fa fa-plus fa-3x" />
                            </div>
                          </div>
                          <img className="img-fluid" src={item.data.image.url} alt="" />
                          <div className="portfolio-caption">
                            <h4>{RichText.render(item.data.title, linkResolver)}</h4>
                            {/*
                            <p className="text-muted">{RichText.render(item.body, linkResolver)}</p>
                            */}
                          </div>
                        </a>
                      </div>
                    ))}
                </Row>
              </Container>
            </section>

            {/* page.image &&
              <img src={page.image.url} alt={page.image.alt} style={{ maxWidth: '100%' }} />


            <header className="masthead">
              <div className="container">
                <div className="intro-text">
                  <div className="intro-lead-in">Welcome To Foot Right Podiatry!</div>
                  <div className="intro-heading text-uppercase">It's Nice To Meet You</div>
                  <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Services</a> <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Book Now</a>
                </div>
              </div>
            </header>


            <Container className="my-5">
              {RichText.render(page.body, linkResolver)}
            </Container>


            <section className="bg-light" id="portfolio">
              <Container>
                <Row>
                  <Col xs={12} className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                  </Col>
                </Row>


            </section>

 */}
          </div>
        ) : (
          <Row>
            <section id="services">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">
                      Lorem ipsum dolor sit amet consectetur.
                    </h3>
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
          </Row>
        )}
      </View>
    );
  }
}
