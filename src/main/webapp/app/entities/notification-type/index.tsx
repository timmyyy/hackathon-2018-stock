import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NotificationType from './notification-type';
import NotificationTypeDetail from './notification-type-detail';
import NotificationTypeUpdate from './notification-type-update';
import NotificationTypeDeleteDialog from './notification-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NotificationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NotificationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NotificationTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={NotificationType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NotificationTypeDeleteDialog} />
  </>
);

export default Routes;
