import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RequestDetail extends React.Component<IRequestDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { requestEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.request.detail.title">Request</Translate> [<b>{requestEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createTime">
                <Translate contentKey="jhipsterApp.request.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="closeTime">
                <Translate contentKey="jhipsterApp.request.closeTime">Close Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.closeTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="changeTime">
                <Translate contentKey="jhipsterApp.request.changeTime">Change Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.changeTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="jhipsterApp.request.status">Status</Translate>
              </span>
            </dt>
            <dd>{requestEntity.status}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.request.customer">Customer</Translate>
            </dt>
            <dd>{requestEntity.customer ? requestEntity.customer.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.request.task">Task</Translate>
            </dt>
            <dd>{requestEntity.task ? requestEntity.task.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.request.feedback">Feedback</Translate>
            </dt>
            <dd>{requestEntity.feedback ? requestEntity.feedback.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/request" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/request/${requestEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ request }: IRootState) => ({
  requestEntity: request.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDetail);
