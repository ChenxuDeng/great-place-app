import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceNavigator from "./navigation/Navigation";
import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux'
import places from "./store/reducer/places";
import {init} from './helper/helper'

init().then(()=>{
    console.log('Initialized database')
}).catch((error)=>{
    console.log('Initializing database failed')
    console.log(error)
})

const rootReducer=combineReducers({
    places:places
})

const store=createStore(rootReducer,applyMiddleware(thunk))

export default function App() {
  return (
      <Provider store={store}>
        <PlaceNavigator/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
