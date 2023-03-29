const {
  FAIL_MEMBER,
  LOAD_USER,
  GET_ADMIN,
  UPDATE_MEMBER,
  CHANGE_PASSWORD,
  GET_ADMINS,
  DELETE_ADMIN,
  CREATE_ADMIN,
  VIEW_PROFILE
} = require('../actionTypes')

// initialstate
const initialState = {
  admin: {},
  load: false,
  msg: '',
  error: false
}

// pure function=> (state, {type,payload})=>
const MemberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, load: true }
    case FAIL_MEMBER:
      return { ...state, msg: payload.message, load: false, error: true }
    case VIEW_PROFILE:
      return {
        ...state,
        admin: payload.data,
        load: false
      }
    case GET_ADMIN:
      return {
        ...state,
        admin: payload.data,
        load: false
      }
    case UPDATE_MEMBER:
      return {
        ...state,
        msg: payload.message,
        error: false,
        load: false
      }
    case GET_ADMINS:
      return {
        ...state,
        msg: payload.message,
        error: false,
        load: false
      }
    case DELETE_ADMIN:
      return {
        ...state,
        msg: payload.message,
        error: false,
        load: false
      }
    case CREATE_ADMIN:
      return {
        ...state,
        msg: payload.message,
        error: false,
        load: false
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        msg: payload.message,
        error: false,
        load: false
      }
    default:
      return state
  }
}

export default MemberReducer
