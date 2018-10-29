import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRespond, defaultValue } from 'app/shared/model/respond.model';

export const ACTION_TYPES = {
  FETCH_RESPOND_LIST: 'respond/FETCH_RESPOND_LIST',
  FETCH_RESPOND: 'respond/FETCH_RESPOND',
  CREATE_RESPOND: 'respond/CREATE_RESPOND',
  UPDATE_RESPOND: 'respond/UPDATE_RESPOND',
  DELETE_RESPOND: 'respond/DELETE_RESPOND',
  RESET: 'respond/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRespond>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RespondState = Readonly<typeof initialState>;

// Reducer

export default (state: RespondState = initialState, action): RespondState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESPOND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESPOND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESPOND):
    case REQUEST(ACTION_TYPES.UPDATE_RESPOND):
    case REQUEST(ACTION_TYPES.DELETE_RESPOND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESPOND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESPOND):
    case FAILURE(ACTION_TYPES.CREATE_RESPOND):
    case FAILURE(ACTION_TYPES.UPDATE_RESPOND):
    case FAILURE(ACTION_TYPES.DELETE_RESPOND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESPOND):
    case SUCCESS(ACTION_TYPES.UPDATE_RESPOND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESPOND):
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

const apiUrl = 'api/responds';

// Actions

export const getEntities: ICrudGetAllAction<IRespond> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESPOND_LIST,
  payload: axios.get<IRespond>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRespond> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOND,
    payload: axios.get<IRespond>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRespond> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESPOND,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRespond> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESPOND,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRespond> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESPOND,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
