import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRequest } from 'app/shared/model/request.model';
import { getEntities as getRequests } from 'app/entities/request/request.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaskUpdateState {
  isNew: boolean;
  requestId: string;
  performerId: string;
}

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '0',
      performerId: '0',
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

    this.props.getRequests();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { taskEntity } = this.props;
      const entity = {
        ...taskEntity,
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
    this.props.history.push('/entity/task');
  };

  render() {
    const { taskEntity, requests, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.task.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taskEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="originalTextLabel" for="originalText">
                    <Translate contentKey="jhipsterApp.task.originalText">Original Text</Translate>
                  </Label>
                  <AvField id="task-originalText" type="text" name="originalText" />
                </AvGroup>
                <AvGroup>
                  <Label id="commaSeparatedKeywordsLabel" for="commaSeparatedKeywords">
                    <Translate contentKey="jhipsterApp.task.commaSeparatedKeywords">Comma Separated Keywords</Translate>
                  </Label>
                  <AvField id="task-commaSeparatedKeywords" type="text" name="commaSeparatedKeywords" />
                </AvGroup>
                <AvGroup>
                  <Label id="systemLabel" for="system">
                    <Translate contentKey="jhipsterApp.task.system">System</Translate>
                  </Label>
                  <AvField id="task-system" type="text" name="system" />
                </AvGroup>
                <AvGroup>
                  <Label id="subsystemLabel" for="subsystem">
                    <Translate contentKey="jhipsterApp.task.subsystem">Subsystem</Translate>
                  </Label>
                  <AvField id="task-subsystem" type="text" name="subsystem" />
                </AvGroup>
                <AvGroup>
                  <Label id="complexityLabel">
                    <Translate contentKey="jhipsterApp.task.complexity">Complexity</Translate>
                  </Label>
                  <AvInput
                    id="task-complexity"
                    type="select"
                    className="form-control"
                    name="complexity"
                    value={(!isNew && taskEntity.complexity) || 'LOW'}
                  >
                    <option value="LOW">
                      <Translate contentKey="jhipsterApp.TaskComplexity.LOW" />
                    </option>
                    <option value="MEDIUM">
                      <Translate contentKey="jhipsterApp.TaskComplexity.MEDIUM" />
                    </option>
                    <option value="HARD">
                      <Translate contentKey="jhipsterApp.TaskComplexity.HARD" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="resourcesCountLabel" for="resourcesCount">
                    <Translate contentKey="jhipsterApp.task.resourcesCount">Resources Count</Translate>
                  </Label>
                  <AvField id="task-resourcesCount" type="string" className="form-control" name="resourcesCount" />
                </AvGroup>
                <AvGroup>
                  <Label id="newIntegrationsLabel" check>
                    <AvInput id="task-newIntegrations" type="checkbox" className="form-control" name="newIntegrations" />
                    <Translate contentKey="jhipsterApp.task.newIntegrations">New Integrations</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="modifyIntegrationsLabel" check>
                    <AvInput id="task-modifyIntegrations" type="checkbox" className="form-control" name="modifyIntegrations" />
                    <Translate contentKey="jhipsterApp.task.modifyIntegrations">Modify Integrations</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="newPrintFormsLabel" check>
                    <AvInput id="task-newPrintForms" type="checkbox" className="form-control" name="newPrintForms" />
                    <Translate contentKey="jhipsterApp.task.newPrintForms">New Print Forms</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="modifyPrintFormsLabel" check>
                    <AvInput id="task-modifyPrintForms" type="checkbox" className="form-control" name="modifyPrintForms" />
                    <Translate contentKey="jhipsterApp.task.modifyPrintForms">Modify Print Forms</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="performer.id">
                    <Translate contentKey="jhipsterApp.task.performer">Performer</Translate>
                  </Label>
                  <AvInput id="task-performer" type="select" className="form-control" name="performer.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/task" replace color="info">
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
  requests: storeState.request.entities,
  employees: storeState.employee.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getRequests,
  getEmployees,
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
)(TaskUpdate);
