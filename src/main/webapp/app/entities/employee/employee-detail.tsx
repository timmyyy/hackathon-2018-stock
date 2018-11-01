import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.employee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="role">
                <Translate contentKey="jhipsterApp.employee.role">Role</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.role}</dd>
            <dt>
              <span id="commandRole">
                <Translate contentKey="jhipsterApp.employee.commandRole">Command Role</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.commandRole}</dd>
            <dt>
              <span id="username">
                <Translate contentKey="jhipsterApp.employee.username">Username</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.username}</dd>
            <dt>
              <span id="firstname">
                <Translate contentKey="jhipsterApp.employee.firstname">Firstname</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.firstname}</dd>
            <dt>
              <span id="secondname">
                <Translate contentKey="jhipsterApp.employee.secondname">Secondname</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.secondname}</dd>
            <dt>
              <span id="surename">
                <Translate contentKey="jhipsterApp.employee.surename">Surename</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.surename}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jhipsterApp.employee.email">Email</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.email}</dd>
            <dt>
              <span id="mobilePhone">
                <Translate contentKey="jhipsterApp.employee.mobilePhone">Mobile Phone</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.mobilePhone}</dd>
            <dt>
              <span id="organization">
                <Translate contentKey="jhipsterApp.employee.organization">Organization</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.organization}</dd>
            <dt>
              <span id="department">
                <Translate contentKey="jhipsterApp.employee.department">Department</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.department}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="jhipsterApp.employee.country">Country</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.country}</dd>
            <dt>
              <span id="streetAddress">
                <Translate contentKey="jhipsterApp.employee.streetAddress">Street Address</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.streetAddress}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="jhipsterApp.employee.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.postalCode}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="jhipsterApp.employee.city">City</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.city}</dd>
            <dt>
              <span id="stateProvince">
                <Translate contentKey="jhipsterApp.employee.stateProvince">State Province</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.stateProvince}</dd>
            <dt>
              <span id="rank">
                <Translate contentKey="jhipsterApp.employee.rank">Rank</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.rank}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee/${employeeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
