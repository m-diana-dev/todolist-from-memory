import {FilterType, TodoListsType} from "../App";
import {v1} from "uuid";

type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    payload: {
        id: string
    }
}
type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>
type AddTaskActionType = ReturnType<typeof AddTaskAC>

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        id: string
        idTask: string
        title: string
    }
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        id: string
        idTask: string
        status: boolean
    }
}

type ActionType = DeleteTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | DeleteTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
export const todolistsReducer = (state: TodoListsType[], action: ActionType) => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.payload.title, filter: 'all', tasks: []}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.payload.id
                ? {...todo, title: action.payload.title}
                : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.payload.id
                ? {...todo, filter: action.payload.filter}
                : todo)
        case 'DELETE-TASK':
            return state.map(todo => todo.id === action.payload.id
                ? {...todo, tasks: todo.tasks.filter(task => task.id !== action.payload.idTask)}
                : todo)
        case 'ADD-TASK':
            return state.map(todo => todo.id === action.payload.id
                ? {...todo, tasks: [...todo.tasks, {id: '3', title: action.payload.title, isDone: false}]}
                : todo)
        case 'CHANGE-TASK-TITLE':
            return state.map(todo => todo.id === action.payload.id
                ? {
                    ...todo, tasks: todo.tasks.map(task => task.id === action.payload.idTask
                        ? {...task, title: action.payload.title}
                        : task)
                }
                : todo)
        case 'CHANGE-TASK-STATUS':
            return state.map(todo => todo.id === action.payload.id
                ? {
                    ...todo, tasks: todo.tasks.map(task => task.id === action.payload.idTask
                        ? {...task, isDone: action.payload.status}
                        : task)
                }
                : todo)
    }
    return state
}

export const DeleteTodolistAC = (id: string): DeleteTodolistActionType => ({type: 'DELETE-TODOLIST', payload: {id}})
export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', payload: {title}} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
} as const)
export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
} as const)
export const DeleteTaskAC = (id: string, idTask: string) => ({
    type: 'DELETE-TASK',
    payload: {id, idTask}
} as const)
export const AddTaskAC = (id: string, title: string) => ({
    type: 'ADD-TASK',
    payload: {id, title}
} as const)
export const ChangeTaskTitleAC = (id: string, idTask: string, title: string): ChangeTaskTitleActionType => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {id, idTask, title}
})
export const ChangeTaskStatusAC = (id: string, idTask: string, status: boolean): ChangeTaskStatusActionType => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {id, idTask, status}
})

