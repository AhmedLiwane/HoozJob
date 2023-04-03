import axios from 'axios'

const {
  FAIL_CATEGORY,
  GET_CATEGORIES,
  VIEW_CATEGORY,
  LOAD_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY
} = require('../actionTypes')

export const getCategories = () => async dispatch => {
  dispatch({ type: LOAD_CATEGORY })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/getCategories`, { withCredentials: true })
    dispatch({ type: GET_CATEGORIES, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error.response.data })
  }
}

export const getCategory = id => async dispatch => {
  dispatch({ type: LOAD_CATEGORY })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/getCategory/` + id, {
      withCredentials: true
    })
    dispatch({ type: VIEW_CATEGORY, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error.response.data })
  }
}

export const deleteCategory = id => async dispatch => {
  dispatch({ type: LOAD_CATEGORY })
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/archiveCategory/` + id, '', {
      withCredentials: true
    })
    dispatch({ type: DELETE_CATEGORY, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error.response.data })
  }
}

export const updateCategory = (id, values) => async dispatch => {
  dispatch({ type: LOAD_CATEGORY })
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/editCategory/` + id, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_CATEGORY, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error.response.data })
  }
}

export const createCategory = values => async dispatch => {
  dispatch({ type: LOAD_CATEGORY })
  try {
    console.log(values)

    const result = await axios.post(`https://api.hoozjob.com/api/backoffice/createCategory`, values, {
      withCredentials: true
    })
    dispatch({ type: ADD_CATEGORY, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error.response.data })
  }
}
