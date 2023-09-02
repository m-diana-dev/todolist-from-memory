import { v1 } from 'uuid'
import {TodoListsType} from "../App";
import {
    AddTaskAC,
    AddTodolistAC, ChangeTaskStatusAC, ChangeTaskTitleAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, DeleteTaskAC,
    DeleteTodolistAC,
    todolistsReducer
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TodoListsType[];
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Water", isDone: true},
            ]
        },
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, DeleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodoTitle = 'vine'

    const endState = todolistsReducer(startState, AddTodolistAC(newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoTitle)
})

test('todolist title should be changed', () => {
    const newTodoTitle = 'vine'

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId1,newTodoTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodoTitle)
})

test('todolist filter should be changed', () => {
    const newTodoFilter = 'completed'

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId1, newTodoFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(newTodoFilter)
    expect(endState[1].filter).toBe('all')
})

test('correct task should be removed', () => {

    const endState = todolistsReducer(startState, DeleteTaskAC(todolistId1, '4'))

    expect(endState).toEqual([
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Water", isDone: true},
            ]
        },
    ])
})

test('correct task should be added', () => {
    const newTaskTitle = 'vine'

    const endState = todolistsReducer(startState, AddTaskAC(todolistId2, newTaskTitle))

    expect(endState).toEqual([
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Water", isDone: true},
                {id: '3', title: newTaskTitle, isDone: false},
            ]
        },
    ])
})

test('correct task title should be changed', () => {
    const newTaskTitle = 'vine'

    const endState = todolistsReducer(startState, ChangeTaskTitleAC(todolistId2, '2', newTaskTitle))

    expect(endState).toEqual([
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: newTaskTitle, isDone: true},
            ]
        },
    ])
})

test('correct task status should be changed', () => {

    const endState = todolistsReducer(startState, ChangeTaskStatusAC(todolistId2, '2', false))

    expect(endState).toEqual([
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "Water", isDone: false},
            ]
        },
    ])
})