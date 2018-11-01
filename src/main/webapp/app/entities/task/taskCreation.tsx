import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaskUpdateState {}

const COMPLEXITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.reset();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { taskEntity } = this.props;
      const entity = {
        ...taskEntity,
        ...values
      };

      this.props.createEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/tasks');
  };

  render() {
    const { loading, updating } = this.props;

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
              <AvForm model={{}} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="originalTextLabel" for="originalText">
                    <Translate contentKey="jhipsterApp.task.originalText">Original Text</Translate>
                  </Label>
                  <AvField id="task-originalText" type="textarea" name="originalText" />
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
                  <AvInput id="task-complexity" type="select" className="form-control" name="complexity" value={COMPLEXITY.LOW}>
                    <option value={COMPLEXITY.LOW}>
                      <Translate contentKey="jhipsterApp.TaskComplexity.LOW" />
                    </option>
                    <option value={COMPLEXITY.MEDIUM}>
                      <Translate contentKey="jhipsterApp.TaskComplexity.MEDIUM" />
                    </option>
                    <option value={COMPLEXITY.HARD}>
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
                <Button tag={Link} id="cancel-save" to="/" replace color="info">
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
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
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
)(TaskUpdate);
