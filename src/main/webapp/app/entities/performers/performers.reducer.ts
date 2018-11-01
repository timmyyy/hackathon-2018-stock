import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPerformers, defaultValue } from 'app/shared/model/performers.model';

export const ACTION_TYPES = {
  FETCH_PERFORMERS_LIST: 'performers/FETCH_PERFORMERS_LIST',
  FETCH_PERFORMERS: 'performers/FETCH_PERFORMERS',
  CREATE_PERFORMERS: 'performers/CREATE_PERFORMERS',
  UPDATE_PERFORMERS: 'performers/UPDATE_PERFORMERS',
  DELETE_PERFORMERS: 'performers/DELETE_PERFORMERS',
  RESET: 'performers/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPerformers>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PerformersState = Readonly<typeof initialState>;

// Reducer

export default (state: PerformersState = initialState, action): PerformersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERFORMERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERFORMERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PERFORMERS):
    case REQUEST(ACTION_TYPES.UPDATE_PERFORMERS):
    case REQUEST(ACTION_TYPES.DELETE_PERFORMERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PERFORMERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERFORMERS):
    case FAILURE(ACTION_TYPES.CREATE_PERFORMERS):
    case FAILURE(ACTION_TYPES.UPDATE_PERFORMERS):
    case FAILURE(ACTION_TYPES.DELETE_PERFORMERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERFORMERS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERFORMERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERFORMERS):
    case SUCCESS(ACTION_TYPES.UPDATE_PERFORMERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERFORMERS):
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

const apiUrl = 'api/performers';

// Actions

export const getEntities: ICrudGetAllAction<IPerformers> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PERFORMERS_LIST,
  payload: axios.get<IPerformers>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPerformers> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERFORMERS,
    payload: axios.get<IPerformers>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPerformers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERFORMERS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPerformers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERFORMERS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPerformers> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERFORMERS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
