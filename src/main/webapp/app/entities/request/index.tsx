import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Request from './request';
import RequestDetail from './request-detail';
import RequestUpdate from './request-update';
import RequestDeleteDialog from './request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={Request} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RequestDeleteDialog} />
  </>
);

export default Routes;
