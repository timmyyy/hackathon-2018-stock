import { IEmployee } from 'app/shared/model//employee.model';
import { IRequest } from 'app/shared/model//request.model';

export interface IPerformers {
  id?: number;
  employee?: IEmployee;
  request?: IRequest;
}

export const defaultValue: Readonly<IPerformers> = {};
