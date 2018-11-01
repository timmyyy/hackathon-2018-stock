import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Task from './task';
import TaskList from './task/taskList';
import Employee from './employee';
import Respond from './respond';
import Feedback from './feedback';
import Request from './request';
import Notification from './notification';
import NotificationType from './notification-type';
import Performers from './performers';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/tasks`} component={TaskList} />
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/respond`} component={Respond} />
      <ErrorBoundaryRoute path={`${match.url}/feedback`} component={Feedback} />
      <ErrorBoundaryRoute path={`${match.url}/request`} component={Request} />
      <ErrorBoundaryRoute path={`${match.url}/notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}/notification-type`} component={NotificationType} />
      <ErrorBoundaryRoute path={`${match.url}/performers`} component={Performers} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
