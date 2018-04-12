import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
// f00tr1ght! { path: '/booking', exact: true, component: Booking },

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const styles = require('./siteHeader.scss');
    const brandLogo = require('./foot-right-podiatry-logo.png');

    return (
      <div id="header" className={styles.siteHeader}>
        <Navbar color="light" fixed="top" light expand="md" style={{ borderBottom: '1px solid #ccc' }}>
          <Container>
            <NavbarBrand href="/">
              <img src={brandLogo} alt="Foot Right Podiatry" className={styles.siteLogo} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/services">Services</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/blog">Blog</NavLink>
                </NavItem>
                {/*
                border-bottom: 1px solid #8591a529;
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                  Services
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                */}

                <NavItem>
                  <NavLink href="/contact">Contact</NavLink>
                </NavItem>
                <NavItem>
                  <a href="/booking" className="btn btn-primary">Book Now</a>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
