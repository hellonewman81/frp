import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export default class ListGroupBox extends React.Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
            blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
            blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
            blandit.
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
