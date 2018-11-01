import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import CustomerHome from 'app/modules/customer-home/customer-home';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          {account && account.login ? (
            <CustomerHome />
          ) : (
            <div>
              <Alert color="warning">
                <h4>Добро пожаловать на STOCK!</h4>
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>
                &nbsp;
                <Link to="/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
              <p>Список форм для отладки</p>
              <ul>
                <li>
                  <Link to={'/register'}>Регистрация</Link>
                </li>
                <li>
                  <Link to={'/login'}>Авторизация</Link>
                </li>
                <li>
                  <Link to={'/entity/task-creation'}>Публикация заявки</Link>
                </li>
              </ul>
            </div>
          )}
        </Col>
        <Col md="3" className="pad" />
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
