import { createStore, applyMiddleware } from 'redux';
//import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk';
import reducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  blacklist: ['login']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(Store);

module.exports = { Store, persistor };