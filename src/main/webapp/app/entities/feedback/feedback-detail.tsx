import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './feedback.reducer';
import { IFeedback } from 'app/shared/model/feedback.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFeedbackDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FeedbackDetail extends React.Component<IFeedbackDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { feedbackEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.feedback.detail.title">Feedback</Translate> [<b>{feedbackEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="rank">
                <Translate contentKey="jhipsterApp.feedback.rank">Rank</Translate>
              </span>
            </dt>
            <dd>{feedbackEntity.rank}</dd>
          </dl>
          <Button tag={Link} to="/entity/feedback" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/feedback/${feedbackEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ feedback }: IRootState) => ({
  feedbackEntity: feedback.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackDetail);
