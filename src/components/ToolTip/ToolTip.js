/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Tooltip } from 'reactstrap';

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { info, linkText, id } = this.props;
    return (
      <span>
        <a href="/" id={id}>
          {linkText}
        </a>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target={id} toggle={this.toggle}>
          {info}
        </Tooltip>
      </span>
    );
  }
}
