import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    return (
      <Row>
        <Col md="9">
          <h2>
            <Translate contentKey="home.title" />
          </h2>
          <Link to={'/register'}>Регистрация</Link>
          <Link to={'/login'}>Авторизация</Link>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => storeState;
const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
