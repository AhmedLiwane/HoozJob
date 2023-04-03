import axios from 'axios'
import {
  FAIL_MEMBER,
  LOAD_USER,
  GET_ADMIN,
  UPDATE_MEMBER,
  CHANGE_PASSWORD,
  GET_ADMINS,
  DELETE_ADMIN,
  UPDATE_REQUEST
} from '../actionTypes'

export const viewProfile = () => async dispatch => {
  dispatch({ type: LOAD_USER })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/viewProfile`, { withCredentials: true })
    dispatch({ type: GET_ADMIN, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })
  }
}

export const updateProfile = values => async dispatch => {
  try {
    const result = await axios.post(`https://api.hoozjob.com/api/backoffice/updateProfile`, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_MEMBER, payload: result.data })

    return result
  } catch (error) {
    console.log(error)
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })

    return error
  }
}

export const updateAdmin = (id, values) => async dispatch => {
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/editAdmin/` + id, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_MEMBER, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })

    return error
  }
}

export const updateProRequest = (id, proResult) => async dispatch => {
  try {
    const result = await axios.put(
      `https://api.hoozjob.com/api/backoffice/updateProRequest/` + id,
      { result: proResult },
      {
        withCredentials: true
      }
    )
    dispatch({ type: UPDATE_REQUEST, payload: result.data })

    return result
  } catch (error) {
    console.log(error)
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })

    return error
  }
}

export const changePassword = values => async dispatch => {
  try {
    const result = await axios.post(`https://api.hoozjob.com/api/backoffice/changePassword`, values, {
      withCredentials: true
    })
    dispatch({ type: CHANGE_PASSWORD, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })

    return error
  }
}

export const getAllAdmins = () => async dispatch => {
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/getAllAdmins`, {
      withCredentials: true
    })
    dispatch({ type: GET_ADMINS, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })
  }
}

export const removeAdmin = id => async dispatch => {
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/archiveAdmin/` + id, '', {
      withCredentials: true
    })
    dispatch({ type: DELETE_ADMIN, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })
  }
}

export const addAdmin = values => async dispatch => {
  try {
    const result = await axios.post(`https://api.hoozjob.com/api/backoffice/createAdmin`, values, {
      withCredentials: true
    })
    dispatch({ type: DELETE_ADMIN, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })
  }
}

export const getAdmin = id => async dispatch => {
  dispatch({ type: LOAD_USER })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/viewAdmin/` + id, { withCredentials: true })
    dispatch({ type: GET_ADMIN, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_MEMBER, payload: error.response.data })
  }
}
