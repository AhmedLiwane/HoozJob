const { LOGIN_USER, FAIL_USER, LOAD_USER, RESET_USER, LOGOUT_USER, CURRENT_USER } = require('../actionTypes')

// initialstate
const initialState = {
  user: {},
  isAuth: false,
  load: false,
  msg: ''
}

// pure function=> (state, {type,payload})=>
const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, load: true }

    case LOGIN_USER:
      return {
        ...state,
        load: false,
        isAuth: true
      }
    case FAIL_USER:
      return { ...state, msg: payload.message, load: false, isAuth: false }
    case CURRENT_USER:
      return { ...state, msg: payload.message, isAuth: true, user: payload.userData, load: false }
    case RESET_USER:
      return {
        ...state,
        isAuth: false,
        load: false,
        msg: payload.message
      }
    case LOGOUT_USER:
      localStorage.removeItem('accessToken')

      return { ...state, isAuth: false }
    default:
      return state
  }
}

export default AuthReducer
