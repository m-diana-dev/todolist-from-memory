import {todolistsReducer} from "./todolist-reducer";
import {combineReducers, createStore} from "redux";

const RootReducer = combineReducers({
    todoLists: todolistsReducer
})

export const AppStore= createStore(RootReducer)

export type AppStateType = ReturnType<typeof RootReducer>