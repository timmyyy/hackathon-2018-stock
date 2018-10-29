export const enum NotificationTypeCode {
  NEW_REQUEST = 'NEW_REQUEST',
  NEW_RESPONSE = 'NEW_RESPONSE',
  YOU_ARE_THE_CHOSEN_ONE = 'YOU_ARE_THE_CHOSEN_ONE',
  REQUEST_CONFIRMED = 'REQUEST_CONFIRMED'
}

export interface INotificationType {
  id?: number;
  code?: NotificationTypeCode;
  title?: string;
  text?: string;
}

export const defaultValue: Readonly<INotificationType> = {};
