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
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IFeedback } from 'app/shared/model/feedback.model';
import { getEntities as getFeedbacks } from 'app/entities/feedback/feedback.reducer';
import { getEntity, updateEntity, createEntity, reset } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRequestUpdateState {
  isNew: boolean;
  customerId: string;
  performerId: string;
  taskId: string;
  feedbackId: string;
}

export class RequestUpdate extends React.Component<IRequestUpdateProps, IRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
      performerId: '0',
      taskId: '0',
      feedbackId: '0',
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
    this.props.getTasks();
    this.props.getFeedbacks();
  }

  saveEntity = (event, errors, values) => {
    values.createTime = new Date(values.createTime);
    values.closeTime = new Date(values.closeTime);
    values.changeTime = new Date(values.changeTime);

    if (errors.length === 0) {
      const { requestEntity } = this.props;
      const entity = {
        ...requestEntity,
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
    this.props.history.push('/entity/request');
  };

  render() {
    const { requestEntity, employees, tasks, feedbacks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.request.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.request.home.createOrEditLabel">Create or edit a Request</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : requestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="jhipsterApp.request.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="request-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.createTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="closeTimeLabel" for="closeTime">
                    <Translate contentKey="jhipsterApp.request.closeTime">Close Time</Translate>
                  </Label>
                  <AvInput
                    id="request-closeTime"
                    type="datetime-local"
                    className="form-control"
                    name="closeTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.closeTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="changeTimeLabel" for="changeTime">
                    <Translate contentKey="jhipsterApp.request.changeTime">Change Time</Translate>
                  </Label>
                  <AvInput
                    id="request-changeTime"
                    type="datetime-local"
                    className="form-control"
                    name="changeTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.changeTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterApp.request.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="request-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && requestEntity.status) || 'NEW'}
                  >
                    <option value="NEW">
                      <Translate contentKey="jhipsterApp.RequestStatus.NEW" />
                    </option>
                    <option value="PERFORMERS_REQUESTED">
                      <Translate contentKey="jhipsterApp.RequestStatus.PERFORMERS_REQUESTED" />
                    </option>
                    <option value="PERFORMERS_ACCEPTED">
                      <Translate contentKey="jhipsterApp.RequestStatus.PERFORMERS_ACCEPTED" />
                    </option>
                    <option value="PERFORMERS_SELECTED">
                      <Translate contentKey="jhipsterApp.RequestStatus.PERFORMERS_SELECTED" />
                    </option>
                    <option value="PERFORMER_CONFIRMED">
                      <Translate contentKey="jhipsterApp.RequestStatus.PERFORMER_CONFIRMED" />
                    </option>
                    <option value="IN_PROGRESS">
                      <Translate contentKey="jhipsterApp.RequestStatus.IN_PROGRESS" />
                    </option>
                    <option value="DONE">
                      <Translate contentKey="jhipsterApp.RequestStatus.DONE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.id">
                    <Translate contentKey="jhipsterApp.request.customer">Customer</Translate>
                  </Label>
                  <AvInput id="request-customer" type="select" className="form-control" name="customer.id">
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
                  <Label for="performer.id">
                    <Translate contentKey="jhipsterApp.request.performer">Performer</Translate>
                  </Label>
                  <AvInput id="request-performer" type="select" className="form-control" name="performer.id">
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
                  <Label for="task.id">
                    <Translate contentKey="jhipsterApp.request.task">Task</Translate>
                  </Label>
                  <AvInput id="request-task" type="select" className="form-control" name="task.id">
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="feedback.id">
                    <Translate contentKey="jhipsterApp.request.feedback">Feedback</Translate>
                  </Label>
                  <AvInput id="request-feedback" type="select" className="form-control" name="feedback.id">
                    <option value="" key="0" />
                    {feedbacks
                      ? feedbacks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/request" replace color="info">
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
  tasks: storeState.task.entities,
  feedbacks: storeState.feedback.entities,
  requestEntity: storeState.request.entity,
  loading: storeState.request.loading,
  updating: storeState.request.updating,
  updateSuccess: storeState.request.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getTasks,
  getFeedbacks,
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
)(RequestUpdate);
