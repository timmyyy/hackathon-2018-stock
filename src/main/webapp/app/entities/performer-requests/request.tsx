import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './request.reducer';
import { RequestStatus } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import RequestDetail from 'app/entities/performer-requests/request-detail';

export interface IRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

var selected = null;
var requestSource = {
  id: 4,
  status: RequestStatus.NEW,
  customer: { id: 2, fio: 'Иванов Иван Иванович' },
  task: { id: 4, text: 'Внедрить новый вклад' }
};

export class Request extends React.Component<IRequestProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { requestList } = this.props;
    return (
      <Row>
        <Col md={selected == null ? '12' : '6'}>
          <div className="table-responsive">
            <Table responsive>
              <thead>
                <tr>
                  <th>Статус</th>
                  <th>Заказчик</th>
                  <th>Задача</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {requestList.map((request, i) => (
                  <tr
                    key={`entity-${i}`}
                    className={
                      request.status == RequestStatus.NEW
                        ? 'table-warning'
                        : request.status == RequestStatus.PERFORMERS_ACCEPTED
                          ? 'table-success'
                          : ''
                    }
                  >
                    <td>{request.status}</td>
                    <td>{request.customer ? <Link to={`/customer`}>{request.customer.fio}</Link> : ''}</td>
                    <td>{request.task ? request.task.text : ''}</td>
                    <td className="text-right">
                      {selected == null && (
                        <div className="btn-group flex-btn-group-container">
                          <Button
                            onClick={() => {
                              selected = request.id;

                              this.props.getEntities();
                            }}
                            color="info"
                            size="sm"
                          >
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        {selected != null && (
          <Col md="6">
            <RequestDetail
              onClose={() => {
                selected = null;

                this.props.getEntities();
              }}
              onOk={() => {
                selected = null;
                requestSource.status = RequestStatus.PERFORMERS_ACCEPTED;

                this.props.getEntities();
              }}
            />
          </Col>
        )}
      </Row>
    );
  }
}

const mapStateToProps = ({ request }: IRootState) => ({
  // requestList: request.entities
  requestList: [requestSource]
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request);
