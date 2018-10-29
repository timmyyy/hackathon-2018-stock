import { Moment } from 'moment';
import { IRequest } from 'app/shared/model//request.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { INotificationType } from 'app/shared/model//notification-type.model';

export interface INotification {
  id?: number;
  createTime?: Moment;
  readed?: boolean;
  request?: IRequest;
  employee?: IEmployee;
  type?: INotificationType;
}

export const defaultValue: Readonly<INotification> = {
  readed: false
};
