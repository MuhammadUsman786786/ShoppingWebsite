import React from "react";
import * as bs from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <bs.Row className='py-3 px-3'>
      <bs.Card style={{ width: "15rem" }}>
        <bs.Card.Img
          variant="top"
          src={`/images/products/${props.product.filename}-1.png`}
        />
        <bs.Card.Body>
          <bs.Card.Title>{props.product.name}</bs.Card.Title>
          <bs.Card.Text>${props.product.price}</bs.Card.Text>
        </bs.Card.Body>
        <Link
          to={`/product/${props.product.id}`}
          className="position-absolute "
          style={{ right: 0 }}
        >
          <bs.Button variant="primary">Details</bs.Button>
        </Link>
        {/* <bs.Button variant='primary' className='position-absolute'>Details</bs.Button>  */}
        {/* consider coming back to this part to fix position */}
      </bs.Card>
    </bs.Row>
  );
}
