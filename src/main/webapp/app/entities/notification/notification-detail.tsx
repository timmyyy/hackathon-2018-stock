import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.notification.detail.title">Notification</Translate> [<b>{notificationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createTime">
                <Translate contentKey="jhipsterApp.notification.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="readed">
                <Translate contentKey="jhipsterApp.notification.readed">Readed</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.readed ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.notification.request">Request</Translate>
            </dt>
            <dd>{notificationEntity.request ? notificationEntity.request.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.notification.employee">Employee</Translate>
            </dt>
            <dd>{notificationEntity.employee ? notificationEntity.employee.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.notification.type">Type</Translate>
            </dt>
            <dd>{notificationEntity.type ? notificationEntity.type.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/notification/${notificationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
