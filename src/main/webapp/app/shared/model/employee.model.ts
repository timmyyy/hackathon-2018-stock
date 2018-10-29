import { ITask } from 'app/shared/model//task.model';

export const enum EmployeeRole {
  PERFORMER = 'PERFORMER',
  CUSTOMER = 'CUSTOMER'
}

export interface IEmployee {
  id?: number;
  role?: EmployeeRole;
  username?: string;
  firstname?: string;
  secondname?: string;
  surename?: string;
  email?: string;
  mobilePhone?: string;
  organization?: string;
  department?: string;
  country?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  rank?: number;
  completedTasks?: ITask[];
}

export const defaultValue: Readonly<IEmployee> = {};
