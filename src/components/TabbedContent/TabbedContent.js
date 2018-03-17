import React from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
// import Scroll from 'react-scroll';
import { scroller } from 'react-scroll';

// const ScrollLink = Scroll.Link;

export default class TabbedContent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1
    };
  }

  toggle(tab, scrollPos) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      // set scroll to with a delay to give tab enough time to open...
      // maybe swap with a collapse
      clearTimeout(this.debouncedTabs);
      this.debouncedTabs = setTimeout(() => {
        if (scrollPos) {
          scroller.scrollTo(scrollPos, {
            duration: 100,
            delay: 0,
            smooth: 'easeInOutQuart'
          });
        }
      }, 50);
    }
  }
  render() {
    const { items } = this.props;
    const styles = require('./tabbedContent.scss');
    return (
      <div className={`${styles.TabbedContent} d-flex flex-row`}>
        <Nav tabs className={styles.navTabs}>
          {items.map((item, idx) => (
            <NavItem key={`tb_link_${item.title}`}>
              <NavLink
                className={`h6 ${classnames({ active: this.state.activeTab === idx + 1 })}`}
                onClick={() => {
                  this.toggle(idx + 1);
                }}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent className={styles.tabbedContentAccord} activeTab={this.state.activeTab}>
          {items.map((item, idx) => (
            <TabPane
              key={`tb_pane_${item.title}`}
              tabId={idx + 1}
              id={`tab_content_${idx}`}
              className="px-lg-3"
            >
              {/* Mobile accordion button - anchor to parent.. */}
              <Button
                onClick={() => {
                  this.toggle(idx + 1, `tab_content_${idx}`);
                }}
                // href={`#tab_content_${idx}`}
                className={`${styles.accordBtn} d-lg-none text-left`}
                block
                outline
                color="primary"
              >
                {item.title}

                {this.state.activeTab === idx + 1 ? (
                  <i className="fa fa-chevron-up d-none float-right" />
                ) : (
                  <i className="fa fa-chevron-down float-right" />
                )}
              </Button>

              <div className={styles.accordContent}>{item.body}</div>
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}

TabbedContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};
