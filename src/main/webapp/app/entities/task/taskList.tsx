import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task.reducer';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TaskList extends React.Component<ITaskProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { taskList, match } = this.props;
    return (
      <div>
        <h2 id="task-heading">
          <Translate contentKey="jhipsterApp.task.home.title">Tasks</Translate>
          <Link to={`entity/task/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.task.home.createLabel">Create new Task</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jhipsterApp.task.originalText">Original Text</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.task.commaSeparatedKeywords">Comma Separated Keywords</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.task.system">System</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.task.subsystem">Subsystem</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.task.complexity">Complexity</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, i) => (
                <tr key={`entity-${i}`}>
                  <td>{task.originalText}</td>
                  <td>{task.commaSeparatedKeywords}</td>
                  <td>{task.system}</td>
                  <td>{task.subsystem}</td>
                  <td>
                    <Translate contentKey={`jhipsterApp.TaskComplexity.${task.complexity}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`entity/task/${task.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`entity/task/${task.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`entity/task/${task.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ task }: IRootState) => ({
  taskList: task.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
