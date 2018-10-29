import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification-type.reducer';
import { INotificationType } from 'app/shared/model/notification-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificationTypeDetail extends React.Component<INotificationTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.notificationType.detail.title">NotificationType</Translate> [
            <b>{notificationTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="jhipsterApp.notificationType.code">Code</Translate>
              </span>
            </dt>
            <dd>{notificationTypeEntity.code}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="jhipsterApp.notificationType.title">Title</Translate>
              </span>
            </dt>
            <dd>{notificationTypeEntity.title}</dd>
            <dt>
              <span id="text">
                <Translate contentKey="jhipsterApp.notificationType.text">Text</Translate>
              </span>
            </dt>
            <dd>{notificationTypeEntity.text}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/notification-type/${notificationTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notificationType }: IRootState) => ({
  notificationTypeEntity: notificationType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationTypeDetail);
