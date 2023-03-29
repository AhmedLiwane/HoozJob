import axios from 'axios'
import { FAIL_USER, LOAD_STAT, GET_NUMBERS, GET_STAT } from '../actionTypes'

export const getNumbers = () => async dispatch => {
  dispatch({ type: LOAD_STAT })
  try {
    const result = await axios.get(`http://localhost:5000/api/backoffice/getNumbers`, { withCredentials: true })
    dispatch({ type: GET_NUMBERS, payload: result.data })

    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}
