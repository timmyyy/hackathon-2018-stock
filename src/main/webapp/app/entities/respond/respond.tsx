import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './respond.reducer';
import { IRespond } from 'app/shared/model/respond.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRespondProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Respond extends React.Component<IRespondProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { respondList, match } = this.props;
    return (
      <div>
        <h2 id="respond-heading">
          <Translate contentKey="jhipsterApp.respond.home.title">Responds</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.respond.home.createLabel">Create new Respond</Translate>
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
                  <Translate contentKey="jhipsterApp.respond.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.respond.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.respond.request">Request</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {respondList.map((respond, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${respond.id}`} color="link" size="sm">
                      {respond.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterApp.ResponseStatus.${respond.status}`} />
                  </td>
                  <td>{respond.employee ? <Link to={`employee/${respond.employee.id}`}>{respond.employee.id}</Link> : ''}</td>
                  <td>{respond.request ? <Link to={`request/${respond.request.id}`}>{respond.request.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${respond.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${respond.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${respond.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ respond }: IRootState) => ({
  respondList: respond.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Respond);
