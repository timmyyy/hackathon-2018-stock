import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class PerformerHome extends React.Component<IHomeProp> {
  render() {
    const { account } = this.props;

    return (
      <div>
        <h2>Здравствуйте, {account.login}!</h2>

        <Link to={'/entity/tasks-performer'}>Просмотреть мои заявки</Link>
      </div>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    account: storeState.authentication.account
  };
};

const mapDispatchToProps = { getSession, getEmployees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformerHome);
