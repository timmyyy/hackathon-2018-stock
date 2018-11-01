import { ITask } from 'app/shared/model//task.model';

export const enum EmployeeRole {
  PERFORMER = 'PERFORMER',
  CUSTOMER = 'CUSTOMER'
}

export const enum CommandRole {
  DEVELOPER = 'DEVELOPER',
  SYSTEM_ANALYST = 'SYSTEM_ANALYST',
  BUSINESS_ANALYST = 'BUSINESS_ANALYST',
  PRODUCT_OWNER = 'PRODUCT_OWNER',
  DEVOPS_ENGINEER = 'DEVOPS_ENGINEER',
  HAND_TESTER = 'HAND_TESTER',
  AUTO_TESTER = 'AUTO_TESTER'
}

export interface IEmployee {
  id?: number;
  role?: EmployeeRole;
  commandRole?: CommandRole;
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
