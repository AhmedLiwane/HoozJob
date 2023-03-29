const {
  FAIL_TRANSACTION,
  LOAD_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} = require('../actionTypes')

// initialstate
const initialState = {
  transaction: {},
  transactions: [],
  load: false,
  msg: '',
  error: false
}

// pure function=> (state, {type,payload})=>
const TransactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_TRANSACTION:
      return { ...state, load: true }
    case FAIL_TRANSACTION:
      return { ...state, msg: payload.message, load: false, error: true }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload.data,
        load: false
      }
    case UPDATE_TRANSACTION:
      return {
        ...state,
        error: false,
        load: false
      }
    case DELETE_TRANSACTION:
      return {
        ...state,
        error: false,
        load: false
      }
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: payload.data,
        msg: payload.message,
        error: false,
        load: false
      }
    default:
      return state
  }
}

export default TransactionReducer
