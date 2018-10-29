import { IEmployee } from 'app/shared/model//employee.model';
import { IRequest } from 'app/shared/model//request.model';

export const enum ResponseStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface IRespond {
  id?: number;
  status?: ResponseStatus;
  employee?: IEmployee;
  request?: IRequest;
}

export const defaultValue: Readonly<IRespond> = {};
