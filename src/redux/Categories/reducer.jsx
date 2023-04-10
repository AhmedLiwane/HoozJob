const {
  FAIL_CATEGORY,
  GET_CATEGORIES,
  VIEW_CATEGORY,
  LOAD_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY
} = require('../actionTypes')

// initialstate
const initialState = {
  category: {},
  categories: [],
  load: false,
  msg: '',
  error: false
}

// pure function=> (state, {type,payload})=>
const CategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_CATEGORY:
      return { ...state, load: true }
    case FAIL_CATEGORY:
      return { ...state, msg: payload.message, load: false, error: true }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload.data,
        load: false
      }
    case GET_CATEGORY:
      return {
        ...state,
        category: payload.data,
        load: false
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        error: false,
        load: false
      }
    case ADD_CATEGORY:
      return {
        ...state,
        category: payload.data,
        error: false,
        load: false
      }
    case VIEW_CATEGORY:
      return {
        ...state,
        category: payload.data,
        msg: payload.message,
        error: false,
        load: false
      }
    case UPDATE_CATEGORY:
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

export default CategoryReducer
