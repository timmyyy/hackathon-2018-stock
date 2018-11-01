import axios from "axios";
import { translate } from "react-jhipster";
import { REQUEST, SUCCESS, FAILURE } from "app/shared/reducers/action-type.util";
import { login } from "app/shared/reducers/authentication";
import { createEntity as createEmployee } from "app/entities/employee/employee.reducer";

export const ACTION_TYPES = {
  CREATE_ACCOUNT: "register/CREATE_ACCOUNT",
  RESET: "register/RESET"
};

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null
};

export type RegisterState = Readonly<typeof initialState>;

// Reducer
export default ( state: RegisterState = initialState, action ): RegisterState => {
  switch ( action.type ) {
    case REQUEST ( ACTION_TYPES.CREATE_ACCOUNT ):
      return {
        ...state,
        loading: true
      };
    case FAILURE ( ACTION_TYPES.CREATE_ACCOUNT ):
      return {
        ...initialState,
        registrationFailure: true,
        errorMessage: action.payload.response.data.errorKey
      };
    case SUCCESS ( ACTION_TYPES.CREATE_ACCOUNT ):
      return {
        ...initialState,
        registrationSuccess: true
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
export const handleRegister = ( values, langKey = "en", callback ) => dispatch => {
  const dataForEmployer = values;
  const dataForRegister = { ...values, langKey };

  dataForRegister.login = values.username;
  dataForRegister.password = values.firstPassword;

  return {
    type: ACTION_TYPES.CREATE_ACCOUNT,
    payload: axios.post ( "api/register", dataForRegister ).then ( () => {
      dispatch ( login ( values.username, values.firstPassword ) );
      setTimeout(() => {
        dispatch ( createEmployee ( dataForEmployer ) );
        callback()
      }, 2000)
    } ),
    meta: {
      successMessage: translate ( "register.messages.success" )
    }
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
