const { FAIL_LANG, LOAD_LANG } = require("../actionTypes");

// initialstate
const initialState = {
  lg: {},
  error: "",
};

// pure function=> (state, {type,payload})=>
const langReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_LANG:
      return { ...state, lg: payload, error: "" };
    case FAIL_LANG:
      return { ...state, lg: {}, error: payload };
    default:
      return state;
  }
};

export default langReducer;
