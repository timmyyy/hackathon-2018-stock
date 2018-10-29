import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Notification extends React.Component<INotificationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { notificationList, match } = this.props;
    return (
      <div>
        <h2 id="notification-heading">
          <Translate contentKey="jhipsterApp.notification.home.title">Notifications</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.notification.home.createLabel">Create new Notification</Translate>
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
                  <Translate contentKey="jhipsterApp.notification.createTime">Create Time</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notification.readed">Readed</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notification.request">Request</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notification.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notification.type">Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationList.map((notification, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${notification.id}`} color="link" size="sm">
                      {notification.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={notification.createTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{notification.readed ? 'true' : 'false'}</td>
                  <td>{notification.request ? <Link to={`request/${notification.request.id}`}>{notification.request.id}</Link> : ''}</td>
                  <td>
                    {notification.employee ? <Link to={`employee/${notification.employee.id}`}>{notification.employee.id}</Link> : ''}
                  </td>
                  <td>{notification.type ? <Link to={`notification-type/${notification.type.id}`}>{notification.type.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${notification.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notification.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notification.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationList: notification.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
