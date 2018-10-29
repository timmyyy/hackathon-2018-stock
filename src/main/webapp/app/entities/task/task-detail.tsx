import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taskEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="originalText">
                <Translate contentKey="jhipsterApp.task.originalText">Original Text</Translate>
              </span>
            </dt>
            <dd>{taskEntity.originalText}</dd>
            <dt>
              <span id="commaSeparatedKeywords">
                <Translate contentKey="jhipsterApp.task.commaSeparatedKeywords">Comma Separated Keywords</Translate>
              </span>
            </dt>
            <dd>{taskEntity.commaSeparatedKeywords}</dd>
            <dt>
              <span id="system">
                <Translate contentKey="jhipsterApp.task.system">System</Translate>
              </span>
            </dt>
            <dd>{taskEntity.system}</dd>
            <dt>
              <span id="subsystem">
                <Translate contentKey="jhipsterApp.task.subsystem">Subsystem</Translate>
              </span>
            </dt>
            <dd>{taskEntity.subsystem}</dd>
            <dt>
              <span id="complexity">
                <Translate contentKey="jhipsterApp.task.complexity">Complexity</Translate>
              </span>
            </dt>
            <dd>{taskEntity.complexity}</dd>
            <dt>
              <span id="newIntegrations">
                <Translate contentKey="jhipsterApp.task.newIntegrations">New Integrations</Translate>
              </span>
            </dt>
            <dd>{taskEntity.newIntegrations ? 'true' : 'false'}</dd>
            <dt>
              <span id="modifyIntegrations">
                <Translate contentKey="jhipsterApp.task.modifyIntegrations">Modify Integrations</Translate>
              </span>
            </dt>
            <dd>{taskEntity.modifyIntegrations ? 'true' : 'false'}</dd>
            <dt>
              <span id="newPrintForms">
                <Translate contentKey="jhipsterApp.task.newPrintForms">New Print Forms</Translate>
              </span>
            </dt>
            <dd>{taskEntity.newPrintForms ? 'true' : 'false'}</dd>
            <dt>
              <span id="modifyPrintForms">
                <Translate contentKey="jhipsterApp.task.modifyPrintForms">Modify Print Forms</Translate>
              </span>
            </dt>
            <dd>{taskEntity.modifyPrintForms ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.task.performer">Performer</Translate>
            </dt>
            <dd>{taskEntity.performer ? taskEntity.performer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/task" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/task/${taskEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
