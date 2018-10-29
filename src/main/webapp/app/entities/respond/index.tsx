import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Respond from './respond';
import RespondDetail from './respond-detail';
import RespondUpdate from './respond-update';
import RespondDeleteDialog from './respond-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RespondUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RespondUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RespondDetail} />
      <ErrorBoundaryRoute path={match.url} component={Respond} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RespondDeleteDialog} />
  </>
);

export default Routes;
