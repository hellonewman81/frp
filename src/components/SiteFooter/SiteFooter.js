import React from 'react';

export default class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const styles = require('./siteFooter.scss');
    return (
      <footer className={styles.SiteFooter}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h5 className="footer-heading">Help</h5>
              <ul className="list-inline">
                <li>
                  <a href="/contact">Contact us</a>
                </li>
                <li>
                  <a href="/services">Services</a>
                </li>
                <li>
                  <a href="/services">Blog</a>
                </li>
                <li>
                  <a href="/bookings">Bookings</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <h5 className="footer-heading">Social</h5>
              <ul className="list-inline">
                <li>
                  <a href="https://www.facebook.com/macquariepodiatry/">
                    <i className="fa fa-facebook-square fa-2x" /> Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="mw-100" />

          <div className="footer-copyright py-4 ">
            <p>Shop 1044B, level 1 upper, Macquarie Shopping Centre, Macquarie Park NSW 2113</p>
            <p>
              <b>Phone:</b> (02) 9887 2270
            </p>
            <p>Copyright &copy; 2018 footrightpodiatry.com.au</p>
          </div>
        </div>
      </footer>
    );
  }
}
