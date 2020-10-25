import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './Reducers/allReducers'

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore

import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
  apiKey: 'AIzaSyAibMpXFMQQek1fWJ8pz2XkmqlDH0tRFR4',
  authDomain: 'blogging-project-381d5.firebaseapp.com',
  databaseURL: 'https://blogging-project-381d5.firebaseio.com',
  projectId: 'blogging-project-381d5',
  storageBucket: 'blogging-project-381d5.appspot.com',
  messagingSenderId: '113859534834',
  appId: '1:113859534834:web:017058256df3955d7d156b',
  measurementId: 'G-6SXR9KVM0X',
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
const middleware = [thunk]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

export default store
