import { IRequest } from 'app/shared/model//request.model';

export interface IFeedback {
  id?: number;
  rank?: number;
  request?: IRequest;
}

export const defaultValue: Readonly<IFeedback> = {};
