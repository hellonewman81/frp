import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';

export default class CardAccordion extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.any).isRequired
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 0 };
  }

  toggle(e) {
    const { event } = e.target.dataset;
    this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
  }
  render() {
    const { collapse } = this.state;
    const { cards } = this.props;
    return (
      <div className="card-accordion card-accordion-filters">
        {cards.map((card, idx) => (
          <Card style={{ marginBottom: '1rem' }} key={card.facet}>
            <CardHeader onClick={this.toggle} data-event={idx}>
              {card.label.replace('_', ' ')}
            </CardHeader>
            <Collapse isOpen={collapse === idx}>
              <CardBody>{card.facet}</CardBody>
            </Collapse>
          </Card>
        ))}
      </div>
    );
  }
}
