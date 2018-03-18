import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import View from 'components/View/View';
import ModalLink from 'components/ModalLink/ModalLink';
import Iframe from 'react-iframe';

const AnyReactComponent = ({ text, styles }) => (
  <div className={styles.greatPlaceStyle}>{text}</div>
);

const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === 'service') return `/service/${doc.uid}`;
  if (doc.type === 'page') return `/${doc.uid}`;
  // Fallback for other types, in case new custom types get created
  return `/blog/${doc.id}`;
};

export default class Contact extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    changeVid: null,
    center: [-33.7774822, 151.0498696],
    zoom: 12,
    greatPlaceCoords: { lat: -33.7774822, lng: 151.0498696 }
  };

  render() {
    // const {} = this.props;
    const styles = require('./Contact.scss');
    return (
      <View contaainer={false}>
        <div className="pt-md-2">
          <Helmet
            title="Foot Right Podiatry"
            meta={[{ name: 'description', content: 'Foot Right Podiatry' }]}
          />
          <Container className="py-4">
            {/*
            <form action="http://formspree.io/hellonewman81@gmail.com" method="post">
              <input type="email" name="_replyto" />
              <textarea  />
            </form>
            */}
            <h2 className="section-heading text-uppercase">Contact Us</h2>

            <Form action="http://formspree.io/hellonewman81@gmail.com" method="post">
              <FormGroup>
                <Label for="_replyto">Email</Label>
                <Input type="email" name="_replyto" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="body">Comment</Label>
                <Input type="textarea" name="body" id="body" />
              </FormGroup>
              {/*
              <input type="submit" value="Send" />
              */}
              <Button type="submit" value="Send">Submit</Button>
            </Form>

          </Container>

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
        </div>
      </View>
    );
  }
}
