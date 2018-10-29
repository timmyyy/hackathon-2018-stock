import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Feedback from './feedback';
import FeedbackDetail from './feedback-detail';
import FeedbackUpdate from './feedback-update';
import FeedbackDeleteDialog from './feedback-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FeedbackUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FeedbackUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FeedbackDetail} />
      <ErrorBoundaryRoute path={match.url} component={Feedback} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FeedbackDeleteDialog} />
  </>
);

export default Routes;
