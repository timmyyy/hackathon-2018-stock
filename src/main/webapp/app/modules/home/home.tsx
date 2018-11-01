import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
    this.props.getEmployees();
  }

  render() {
    const { account, employees, isAuthenticated } = this.props;
    const employee = employees.find(item => item.username.toLocaleLowerCase() === account.login);

    return (
      <Row>
        <Col md="12">
          {isAuthenticated ? (
            <div>
              <h2>Здравствуйте, {account.login}!</h2>
              {employee && employee.role === 'CUSTOMER' && <Link to={'/entity/task-creation'}>Оформить заявку</Link>}

              {employee && employee.role === 'PERFORMER' && <Link to={'/entity/tasks-performer'}>Просмотреть мои заявки</Link>}
            </div>
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
      </Row>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    employees: storeState.employee.entities
  };
};

const mapDispatchToProps = { getSession, getEmployees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
