import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    todoList: reducer
})
type RootReducerType = typeof rootReducer // (state: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store