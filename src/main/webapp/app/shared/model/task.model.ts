import { IRequest } from 'app/shared/model//request.model';
import { IEmployee } from 'app/shared/model//employee.model';

export const enum TaskComplexity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface ITask {
  id?: number;
  originalText?: string;
  commaSeparatedKeywords?: string;
  system?: string;
  subsystem?: string;
  complexity?: TaskComplexity;
  newIntegrations?: boolean;
  modifyIntegrations?: boolean;
  newPrintForms?: boolean;
  modifyPrintForms?: boolean;
  request?: IRequest;
  performer?: IEmployee;
}

export const defaultValue: Readonly<ITask> = {
  newIntegrations: false,
  modifyIntegrations: false,
  newPrintForms: false,
  modifyPrintForms: false
};
