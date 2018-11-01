import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Performers from './performers';
import PerformersDetail from './performers-detail';
import PerformersUpdate from './performers-update';
import PerformersDeleteDialog from './performers-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PerformersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PerformersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PerformersDetail} />
      <ErrorBoundaryRoute path={match.url} component={Performers} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PerformersDeleteDialog} />
  </>
);

export default Routes;
