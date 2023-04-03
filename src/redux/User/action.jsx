import axios from 'axios'

const {
  FAIL_USER,
  LOAD_USER,
  GET_USER,
  GET_ALL,
  UPDATE_APPLICANT,
  DELETE_USER,
  UPDATE_USER
} = require('../actionTypes')

export const getUser = id => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })

    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/viewUser/${id}`, {
      withCredentials: true
    })
    dispatch({ type: GET_USER, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })

    const result = await axios.get('https://api.hoozjob.com/api/backoffice/getAllUsers', {
      withCredentials: true
    })
    dispatch({ type: GET_ALL, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const removeUser = id => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })

    const result = await axios.put('https://api.hoozjob.com/api/backoffice/archiveUser/' + id, '', {
      withCredentials: true
    })
    dispatch({ type: DELETE_USER, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const updateUser = (id, values) => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })

    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/editUser/${id}`, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_USER, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const updateProvider = (id, values) => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })

    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/editProvider/${id}`, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_USER, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}
