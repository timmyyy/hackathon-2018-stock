import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notification-type.reducer';
import { INotificationType } from 'app/shared/model/notification-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NotificationType extends React.Component<INotificationTypeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { notificationTypeList, match } = this.props;
    return (
      <div>
        <h2 id="notification-type-heading">
          <Translate contentKey="jhipsterApp.notificationType.home.title">Notification Types</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.notificationType.home.createLabel">Create new Notification Type</Translate>
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
                  <Translate contentKey="jhipsterApp.notificationType.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notificationType.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.notificationType.text">Text</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationTypeList.map((notificationType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${notificationType.id}`} color="link" size="sm">
                      {notificationType.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterApp.NotificationTypeCode.${notificationType.code}`} />
                  </td>
                  <td>{notificationType.title}</td>
                  <td>{notificationType.text}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${notificationType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notificationType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notificationType.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ notificationType }: IRootState) => ({
  notificationTypeList: notificationType.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationType);
