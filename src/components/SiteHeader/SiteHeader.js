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
        <Navbar color="dark" fixed="top" dark expand="md">
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
                {/*

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
                  <NavLink href="/booking">Bookings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contact">Contact</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
