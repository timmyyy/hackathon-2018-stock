import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Alert } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getRequests } from 'app/entities/request/request.reducer';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset, getTomato } from './task.reducer';
import axios from 'axios';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaskUpdateState {}

var originalText = '';

const fake = [
  {
    firstname: 'Иван',
    secondname: 'Комаров'
  },
  {
    firstname: 'Мальцев',
    secondname: 'Стаснислав'
  }
];

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '0',
      performerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id,
      performers: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      // this.handleClose();
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

      this.handleClose();
    }
  };

  search = () => {
    axios.get('/api/search/' + this.props.taskEntity.commaSeparatedKeywords).then(response => {
      this.setState({ performers: response.data });
    });
  };

  handleClose = () => {
    this.props.history.push('/entity/task');
  };

  render() {
    const { taskEntity, requests, employees, loading, updating, getTomato } = this.props;
    const { isNew, performers } = this.state;

    const onTomato = () => {
      getTomato(originalText);
    };

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
              <AvForm model={taskEntity || {}} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="originalTextLabel" for="originalText">
                    <Translate contentKey="jhipsterApp.task.originalText">Original Text</Translate>
                  </Label>
                  <AvField
                    id="task-originalText"
                    type="textarea"
                    rows={5}
                    name="originalText"
                    onChange={(ev, text123) => {
                      originalText = text123;
                    }}
                  />
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
                {performers &&
                  performers.length > 0 && <h4 style={{ margin: '50px 0 0' }}>По вашей задаче найдены кандидаты на исполнение:</h4>}
                {performers &&
                  performers.length > 0 &&
                  performers.map(item => {
                    return (
                      <Alert color="success" style={{ margin: '20px 0' }}>
                        <Row>
                          <Col md={1}>
                            <img
                              src="http://www.stickpng.com/assets/images/585e4bcdcb11b227491c3396.png"
                              style={{ width: 30, padding: '10px 0 0' }}
                            />
                          </Col>
                          <Col md={11}>
                            {item.firstname && (
                              <span>
                                Имя: {item.firstname}
                                <br />
                              </span>
                            )}
                            {item.secondname && (
                              <span>
                                Фамилия: {item.secondname}
                                <br />
                              </span>
                            )}
                            {item.email && (
                              <span>
                                Эл. адрес: {item.email}
                                <br />
                              </span>
                            )}
                            {item.mobilePhone && (
                              <span>
                                Мобильный телефон: {item.mobilePhone}
                                <br />
                              </span>
                            )}
                            {item.organization && (
                              <span>
                                Организация: {item.organization}
                                <br />
                              </span>
                            )}
                            {item.department && (
                              <span>
                                Департамент: {item.department}
                                <br />
                              </span>
                            )}
                            {item.rank && <span>Карма: {item.rank}</span>}
                            <br />
                            <Button>Отправить запрос</Button>
                          </Col>
                        </Row>
                      </Alert>
                    );
                  })}
                <Button tag={Link} id="cancel-save" to="/entity/task" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  replace
                  color="info"
                  id="tomato"
                  name="tomato"
                  value="qwerty"
                  onClick={e => {
                    e.stopPropagation();

                    onTomato();
                  }}
                >
                  <FontAwesomeIcon icon="arrow-up" />
                  &nbsp;
                  <span className="d-info d-md-inline">Предзаполнение</span>
                </Button>
                &nbsp;
                <Button color="info" onClick={this.search}>
                  &nbsp;
                  <span className="d-info d-md-inline">Найти</span>
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
  updateSuccess: storeState.task.updateSuccess,
  store: storeState
});

const mapDispatchToProps = {
  getRequests,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getTomato
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskUpdate);
