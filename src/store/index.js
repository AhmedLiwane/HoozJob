/* eslint-disable */

import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../redux/index'
import thunkMiddleware from 'redux-thunk'
const composeEnhancers = (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store

// // ** Toolkit imports
// import { configureStore } from '@reduxjs/toolkit'

// // ** Reducers
// import chat from 'src/store/apps/chat'
// import user from 'src/store/apps/user'
// import email from 'src/store/apps/email'
// import invoice from 'src/store/apps/invoice'
// import calendar from 'src/store/apps/calendar'
// import permissions from 'src/store/apps/permissions'

// export const store = configureStore({
//   reducer: {
//     user,
//     chat,
//     email,
//     invoice,
//     calendar,
//     permissions
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// })
