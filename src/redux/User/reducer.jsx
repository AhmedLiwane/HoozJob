const { FAIL_USER, LOAD_USER, GET_USER, GET_ALL, UPDATE_USER, DELETE_USER, CHANGE_PASSWORD } = require('../actionTypes')

// initialstate
const initialState = {
  users: [],
  user: {},
  load: false,
  msg: ''
}

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, load: true }
    case DELETE_USER:
      return { ...state, load: false }
    case FAIL_USER:
      return { ...state, msg: payload.message, load: false }
    case UPDATE_USER:
      return { ...state, msg: payload.message, load: false }
    case CHANGE_PASSWORD:
      return { ...state, msg: payload.message, load: false }
    case GET_ALL:
      return { ...state, msg: payload.message, users: payload.data, load: false }
    case GET_USER:
      return { ...state, msg: payload.message, user: payload.data, load: false }
    default:
      return state
  }
}

export default UserReducer
