import './footer.css';
import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12" style={{ textAlign: 'center', margin: '10px 0 0  ' }}>
        Sber Hackathon 2018
      </Col>
    </Row>
  </div>
);

export default Footer;
