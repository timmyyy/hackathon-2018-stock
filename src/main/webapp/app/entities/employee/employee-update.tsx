import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.employee.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleLabel">
                    <Translate contentKey="jhipsterApp.employee.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="employee-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && employeeEntity.role) || 'PERFORMER'}
                  >
                    <option value="PERFORMER">
                      <Translate contentKey="jhipsterApp.EmployeeRole.PERFORMER" />
                    </option>
                    <option value="CUSTOMER">
                      <Translate contentKey="jhipsterApp.EmployeeRole.CUSTOMER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="usernameLabel" for="username">
                    <Translate contentKey="jhipsterApp.employee.username">Username</Translate>
                  </Label>
                  <AvField id="employee-username" type="text" name="username" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstnameLabel" for="firstname">
                    <Translate contentKey="jhipsterApp.employee.firstname">Firstname</Translate>
                  </Label>
                  <AvField id="employee-firstname" type="text" name="firstname" />
                </AvGroup>
                <AvGroup>
                  <Label id="secondnameLabel" for="secondname">
                    <Translate contentKey="jhipsterApp.employee.secondname">Secondname</Translate>
                  </Label>
                  <AvField id="employee-secondname" type="text" name="secondname" />
                </AvGroup>
                <AvGroup>
                  <Label id="surenameLabel" for="surename">
                    <Translate contentKey="jhipsterApp.employee.surename">Surename</Translate>
                  </Label>
                  <AvField id="employee-surename" type="text" name="surename" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="jhipsterApp.employee.email">Email</Translate>
                  </Label>
                  <AvField id="employee-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="mobilePhoneLabel" for="mobilePhone">
                    <Translate contentKey="jhipsterApp.employee.mobilePhone">Mobile Phone</Translate>
                  </Label>
                  <AvField id="employee-mobilePhone" type="text" name="mobilePhone" />
                </AvGroup>
                <AvGroup>
                  <Label id="organizationLabel" for="organization">
                    <Translate contentKey="jhipsterApp.employee.organization">Organization</Translate>
                  </Label>
                  <AvField id="employee-organization" type="text" name="organization" />
                </AvGroup>
                <AvGroup>
                  <Label id="departmentLabel" for="department">
                    <Translate contentKey="jhipsterApp.employee.department">Department</Translate>
                  </Label>
                  <AvField id="employee-department" type="text" name="department" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    <Translate contentKey="jhipsterApp.employee.country">Country</Translate>
                  </Label>
                  <AvField id="employee-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetAddressLabel" for="streetAddress">
                    <Translate contentKey="jhipsterApp.employee.streetAddress">Street Address</Translate>
                  </Label>
                  <AvField id="employee-streetAddress" type="text" name="streetAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    <Translate contentKey="jhipsterApp.employee.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField id="employee-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    <Translate contentKey="jhipsterApp.employee.city">City</Translate>
                  </Label>
                  <AvField id="employee-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="stateProvince">
                    <Translate contentKey="jhipsterApp.employee.stateProvince">State Province</Translate>
                  </Label>
                  <AvField id="employee-stateProvince" type="text" name="stateProvince" />
                </AvGroup>
                <AvGroup>
                  <Label id="rankLabel" for="rank">
                    <Translate contentKey="jhipsterApp.employee.rank">Rank</Translate>
                  </Label>
                  <AvField id="employee-rank" type="string" className="form-control" name="rank" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeUpdate);
