import axios from 'axios'

const {
  FAIL_TRANSACTION,
  LOAD_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} = require('../actionTypes')

export const getAllTransactions = () => async dispatch => {
  dispatch({ type: LOAD_TRANSACTION })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/getAllTransactions`, {
      withCredentials: true
    })
    dispatch({ type: GET_TRANSACTIONS, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_TRANSACTION, payload: error.response.data })
  }
}

export const getTransaction = id => async dispatch => {
  dispatch({ type: LOAD_TRANSACTION })
  try {
    const result = await axios.get(`https://api.hoozjob.com/api/backoffice/getTransaction/` + id, {
      withCredentials: true
    })
    dispatch({ type: GET_TRANSACTION, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_TRANSACTION, payload: error.response.data })
  }
}

export const removeTransaction = id => async dispatch => {
  dispatch({ type: LOAD_TRANSACTION })
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/archiveTransaction/` + id, '', {
      withCredentials: true
    })
    dispatch({ type: DELETE_TRANSACTION, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_TRANSACTION, payload: error.response.data })
  }
}

export const updateTransaction = (id, values) => async dispatch => {
  dispatch({ type: LOAD_TRANSACTION })
  try {
    const result = await axios.put(`https://api.hoozjob.com/api/backoffice/editTransaction/` + id, values, {
      withCredentials: true
    })
    dispatch({ type: UPDATE_TRANSACTION, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_TRANSACTION, payload: error.response.data })
  }
}
