import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listReducer from './ListReducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['list']
}


const rootReducer = combineReducers({list:listReducer});

export default persistReducer(persistConfig, rootReducer);