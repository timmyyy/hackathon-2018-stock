import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Employee extends React.Component<IEmployeeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeList, match } = this.props;
    return (
      <div>
        <h2 id="employee-heading">
          <Translate contentKey="jhipsterApp.employee.home.title">Employees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.employee.home.createLabel">Create new Employee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.commandRole">Command Role</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.username">Username</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.firstname">Firstname</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.secondname">Secondname</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.surename">Surename</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.mobilePhone">Mobile Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.organization">Organization</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.department">Department</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.streetAddress">Street Address</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.stateProvince">State Province</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.employee.rank">Rank</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                      {employee.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterApp.EmployeeRole.${employee.role}`} />
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterApp.CommandRole.${employee.commandRole}`} />
                  </td>
                  <td>{employee.username}</td>
                  <td>{employee.firstname}</td>
                  <td>{employee.secondname}</td>
                  <td>{employee.surename}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobilePhone}</td>
                  <td>{employee.organization}</td>
                  <td>{employee.department}</td>
                  <td>{employee.country}</td>
                  <td>{employee.streetAddress}</td>
                  <td>{employee.postalCode}</td>
                  <td>{employee.city}</td>
                  <td>{employee.stateProvince}</td>
                  <td>{employee.rank}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);
