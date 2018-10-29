import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotificationType, defaultValue } from 'app/shared/model/notification-type.model';

export const ACTION_TYPES = {
  FETCH_NOTIFICATIONTYPE_LIST: 'notificationType/FETCH_NOTIFICATIONTYPE_LIST',
  FETCH_NOTIFICATIONTYPE: 'notificationType/FETCH_NOTIFICATIONTYPE',
  CREATE_NOTIFICATIONTYPE: 'notificationType/CREATE_NOTIFICATIONTYPE',
  UPDATE_NOTIFICATIONTYPE: 'notificationType/UPDATE_NOTIFICATIONTYPE',
  DELETE_NOTIFICATIONTYPE: 'notificationType/DELETE_NOTIFICATIONTYPE',
  RESET: 'notificationType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotificationType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NotificationTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: NotificationTypeState = initialState, action): NotificationTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICATIONTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTIFICATIONTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_NOTIFICATIONTYPE):
    case REQUEST(ACTION_TYPES.DELETE_NOTIFICATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICATIONTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.CREATE_NOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_NOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.DELETE_NOTIFICATIONTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICATIONTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICATIONTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTIFICATIONTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTIFICATIONTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTIFICATIONTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/notification-types';

// Actions

export const getEntities: ICrudGetAllAction<INotificationType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTIFICATIONTYPE_LIST,
  payload: axios.get<INotificationType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INotificationType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICATIONTYPE,
    payload: axios.get<INotificationType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INotificationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTIFICATIONTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotificationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTIFICATIONTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotificationType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTIFICATIONTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
