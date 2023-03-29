const { FAIL_USER, LOAD_STAT, GET_NUMBERS } = require('../actionTypes')

// initialstate
const initialState = {
  load: false,
  msg: '',
  error: false
}

// pure function=> (state, {type,payload})=>
const StatisticsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_STAT:
      return { ...state, load: true }
    case FAIL_USER:
      return { ...state, msg: payload.message, load: false }
    case GET_NUMBERS:
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

export default StatisticsReducer
