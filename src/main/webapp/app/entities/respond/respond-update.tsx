import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { IRequest } from 'app/shared/model/request.model';
import { getEntities as getRequests } from 'app/entities/request/request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './respond.reducer';
import { IRespond } from 'app/shared/model/respond.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRespondUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRespondUpdateState {
  isNew: boolean;
  employeeId: string;
  requestId: string;
}

export class RespondUpdate extends React.Component<IRespondUpdateProps, IRespondUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      requestId: '0',
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

    this.props.getEmployees();
    this.props.getRequests();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { respondEntity } = this.props;
      const entity = {
        ...respondEntity,
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
    this.props.history.push('/entity/respond');
  };

  render() {
    const { respondEntity, employees, requests, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.respond.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.respond.home.createOrEditLabel">Create or edit a Respond</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : respondEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="respond-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterApp.respond.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="respond-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && respondEntity.status) || 'NEW'}
                  >
                    <option value="NEW">
                      <Translate contentKey="jhipsterApp.ResponseStatus.NEW" />
                    </option>
                    <option value="ACCEPTED">
                      <Translate contentKey="jhipsterApp.ResponseStatus.ACCEPTED" />
                    </option>
                    <option value="REJECTED">
                      <Translate contentKey="jhipsterApp.ResponseStatus.REJECTED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="employee.id">
                    <Translate contentKey="jhipsterApp.respond.employee">Employee</Translate>
                  </Label>
                  <AvInput id="respond-employee" type="select" className="form-control" name="employee.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="request.id">
                    <Translate contentKey="jhipsterApp.respond.request">Request</Translate>
                  </Label>
                  <AvInput id="respond-request" type="select" className="form-control" name="request.id">
                    <option value="" key="0" />
                    {requests
                      ? requests.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/respond" replace color="info">
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
  employees: storeState.employee.entities,
  requests: storeState.request.entities,
  respondEntity: storeState.respond.entity,
  loading: storeState.respond.loading,
  updating: storeState.respond.updating,
  updateSuccess: storeState.respond.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getRequests,
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
)(RespondUpdate);
