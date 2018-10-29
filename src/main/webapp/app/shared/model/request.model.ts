import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';
import { ITask } from 'app/shared/model//task.model';
import { IFeedback } from 'app/shared/model//feedback.model';
import { IRespond } from 'app/shared/model//respond.model';

export const enum RequestStatus {
  NEW = 'NEW',
  PERFORMERS_REQUESTED = 'PERFORMERS_REQUESTED',
  PERFORMERS_ACCEPTED = 'PERFORMERS_ACCEPTED',
  PERFORMERS_SELECTED = 'PERFORMERS_SELECTED',
  PERFORMER_CONFIRMED = 'PERFORMER_CONFIRMED',
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
  performer?: IEmployee;
  task?: ITask;
  feedback?: IFeedback;
  responses?: IRespond[];
}

export const defaultValue: Readonly<IRequest> = {};
