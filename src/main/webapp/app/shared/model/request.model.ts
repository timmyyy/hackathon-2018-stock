import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';
import { ITask } from 'app/shared/model//task.model';
import { IFeedback } from 'app/shared/model//feedback.model';
import { IRespond } from 'app/shared/model//respond.model';
import { IPerformers } from 'app/shared/model//performers.model';

export const enum RequestStatus {
  NEW = 'Новая',
  PERFORMERS_REQUESTED = 'PERFORMERS_REQUESTED',
  PERFORMERS_ACCEPTED = 'Подтверждена',
  PERFORMERS_SELECTED = 'PERFORMERS_SELECTED',
  PERFORMER_CONFIRMED = 'PERFORMER_CONFIRMED',
  ANALYSIS = 'ANALYSIS',
  APPROVAL = 'APPROVAL',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface IRequest {
  id?: number;
  createTime?: Moment;
  closeTime?: Moment;
  changeTime?: Moment;
  status?: RequestStatus;
  customer?: IEmployee;
  task?: ITask;
  feedback?: IFeedback;
  responses?: IRespond[];
  performers?: IPerformers[];
}

export const defaultValue: Readonly<IRequest> = {};
