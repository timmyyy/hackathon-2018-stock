import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import respond, {
  RespondState
} from 'app/entities/respond/respond.reducer';
// prettier-ignore
import feedback, {
  FeedbackState
} from 'app/entities/feedback/feedback.reducer';
// prettier-ignore
import request, {
  RequestState
} from 'app/entities/request/request.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import notificationType, {
  NotificationTypeState
} from 'app/entities/notification-type/notification-type.reducer';
// prettier-ignore
import performers, {
  PerformersState
} from 'app/entities/performers/performers.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly task: TaskState;
  readonly employee: EmployeeState;
  readonly respond: RespondState;
  readonly feedback: FeedbackState;
  readonly request: RequestState;
  readonly notification: NotificationState;
  readonly notificationType: NotificationTypeState;
  readonly performers: PerformersState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  task,
  employee,
  respond,
  feedback,
  request,
  notification,
  notificationType,
  performers,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
