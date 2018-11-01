import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Alert, Col, Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import PerformerHome from 'app/modules/home/performerHome';
import { EmployeeRole } from 'app/shared/model/employee.model';

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
        <Col
          md="12"
          style={{
            background: !isAuthenticated
              ? 'url(https://insights.dice.com/wp-content/uploads/2018/03/Hipster-Developer-Dice.jpg) center center'
              : '',
            minHeight: 600
          }}
        >
          {isAuthenticated ? (
            <div>
              <Breadcrumb>
                <BreadcrumbItem active>Главная</BreadcrumbItem>
              </Breadcrumb>
              <h2>Здравствуйте, {account.login}!</h2>
              <ul>
                {employee &&
                  employee.role === EmployeeRole.CUSTOMER && (
                    <li>
                      <Link to={'/entity/task-creation'}>Оформить заявку</Link>
                    </li>
                  )}
                {employee &&
                  employee.role === EmployeeRole.CUSTOMER && (
                    <li>
                      <Link to={'/entity/customer-requests'}>Мои заявки</Link>
                    </li>
                  )}
                {employee && employee.role === EmployeeRole.PERFORMER && <PerformerHome />}
              </ul>
            </div>
          ) : (
            <div style={{ position: 'absolute', top: 20, right: 40 }}>
              <Alert color="warning">
                <h4>Добро пожаловать в "Новую Лигу"!</h4>У вас нет аккаунта? &nbsp;
                <Link to="/register" className="alert-link">
                  Создать новый аккаунт
                </Link>
              </Alert>
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
