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
import { NewLink } from 'app/shared/layout/header/header-components';

export interface IRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RequestDetail extends React.Component<IRequestDetailProps> {
  // componentDidMount() {
  //   this.props.getEntity(this.props.match.params.id);
  // }

  render() {
    const { requestEntity } = this.props;
    return (
      <Row>
        <Col md="12">
          <h2>
            <FontAwesomeIcon icon={'pencil'} color={'black'} size={'3x'} /> Задача
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Статус</span>
            </dt>
            <dd>
              <Translate contentKey={`jhipsterApp.RequestStatus.${requestEntity.status}`} />
            </dd>
            <dt>Заказчик</dt>
            <dd>{requestEntity.customer ? requestEntity.customer.fio : ''}</dd>
            <dt>Задача</dt>
            <dd>{requestEntity.task ? requestEntity.task.text : ''}</dd>

            <dt>
              <span id="system">Система</span>
            </dt>
            <dd>{requestEntity.task.system}</dd>
            <dt>
              <span id="subsystem">
                <Translate contentKey="jhipsterApp.task.subsystem">Subsystem</Translate>
              </span>
            </dt>
            <dd>{requestEntity.task.subsystem}</dd>
            <dt>
              <span id="complexity">Сложность</span>
            </dt>
            <dd>{requestEntity.task.complexity}</dd>
            <dt>
              <span id="resourcesCount">Необходимое количество человек</span>
            </dt>
            <dd>{requestEntity.task.resourcesCount}</dd>
            <dt>
              <span id="newIntegrations">
                <Translate contentKey="jhipsterApp.task.newIntegrations">New Integrations</Translate>
              </span>
            </dt>
            <dd>{requestEntity.task.newIntegrations ? <b style={{ color: 'red' }}>V</b> : <b style={{ color: 'gray' }}>X</b>}</dd>
            <dt>
              <span id="modifyIntegrations">
                <Translate contentKey="jhipsterApp.task.modifyIntegrations">Modify Integrations</Translate>
              </span>
            </dt>
            <dd>{requestEntity.task.modifyIntegrations ? <b style={{ color: 'red' }}>V</b> : <b style={{ color: 'gray' }}>X</b>}</dd>
            <dt>
              <span id="newPrintForms">
                <Translate contentKey="jhipsterApp.task.newPrintForms">New Print Forms</Translate>
              </span>
            </dt>
            <dd>{requestEntity.task.newPrintForms ? <b style={{ color: 'red' }}>V</b> : <b style={{ color: 'gray' }}>X</b>}</dd>
            <dt>
              <span id="modifyPrintForms">
                <Translate contentKey="jhipsterApp.task.modifyPrintForms">Modify Print Forms</Translate>
              </span>
            </dt>
            <dd>{requestEntity.task.modifyPrintForms ? <b style={{ color: 'red' }}>V</b> : <b style={{ color: 'gray' }}>X</b>}</dd>
          </dl>
          <Button
            onClick={() => {
              this.props.onClose();
            }}
            replace
            color="info"
          >
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Закрыть</span>
          </Button>
          &nbsp;
          <Button replace color="primary">
            <FontAwesomeIcon icon="anchor" /> <span className="d-none d-md-inline">Откликнуться</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ request }: IRootState) => ({
  // requestEntity: request.entity
  requestEntity: {
    status: 'NEW',
    id: 1,
    customer: { id: 2, fio: 'Иванов Иван Иванович' },
    task: {
      id: 4,
      text: 'Внедрить новый вклад',
      system: 'ЕРИБ',
      subsystem: 'ФП Вклады',
      complexity: 'Средняя',
      resourcesCount: 3,
      newIntegrations: true,
      modifyIntegrations: false,
      newPrintForms: true,
      modifyPrintForms: false
    }
  }
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDetail);
