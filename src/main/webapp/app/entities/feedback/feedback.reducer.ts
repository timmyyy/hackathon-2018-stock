import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFeedback, defaultValue } from 'app/shared/model/feedback.model';

export const ACTION_TYPES = {
  FETCH_FEEDBACK_LIST: 'feedback/FETCH_FEEDBACK_LIST',
  FETCH_FEEDBACK: 'feedback/FETCH_FEEDBACK',
  CREATE_FEEDBACK: 'feedback/CREATE_FEEDBACK',
  UPDATE_FEEDBACK: 'feedback/UPDATE_FEEDBACK',
  DELETE_FEEDBACK: 'feedback/DELETE_FEEDBACK',
  RESET: 'feedback/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFeedback>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FeedbackState = Readonly<typeof initialState>;

// Reducer

export default (state: FeedbackState = initialState, action): FeedbackState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FEEDBACK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FEEDBACK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FEEDBACK):
    case REQUEST(ACTION_TYPES.UPDATE_FEEDBACK):
    case REQUEST(ACTION_TYPES.DELETE_FEEDBACK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FEEDBACK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FEEDBACK):
    case FAILURE(ACTION_TYPES.CREATE_FEEDBACK):
    case FAILURE(ACTION_TYPES.UPDATE_FEEDBACK):
    case FAILURE(ACTION_TYPES.DELETE_FEEDBACK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEEDBACK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEEDBACK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FEEDBACK):
    case SUCCESS(ACTION_TYPES.UPDATE_FEEDBACK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FEEDBACK):
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

const apiUrl = 'api/feedbacks';

// Actions

export const getEntities: ICrudGetAllAction<IFeedback> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FEEDBACK_LIST,
  payload: axios.get<IFeedback>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFeedback> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FEEDBACK,
    payload: axios.get<IFeedback>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFeedback> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FEEDBACK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFeedback> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FEEDBACK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFeedback> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FEEDBACK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
