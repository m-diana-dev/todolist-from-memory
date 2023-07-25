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

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListsType[] = [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', tasks: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', tasks: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        },
    ]

    const endState = todolistsReducer(startState, DeleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodoTitle = 'vine'
    const startState: TodoListsType[] = [
        {
            id: v1(), title: 'What to learn', filter: 'all', tasks: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: v1(), title: 'What to buy', filter: 'all', tasks: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        },
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoTitle)
})

test('todolist title should be changed', () => {
    const ID1 = v1();
    const ID2 = v1();
    const newTodoTitle = 'vine'
    const startState: TodoListsType[] = [
        {
            id: ID1, title: 'What to learn', filter: 'all', tasks: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: ID2, title: 'What to buy', filter: 'all', tasks: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        },
    ]

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(ID1,newTodoTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodoTitle)
})

test('todolist filter should be changed', () => {
    const ID1 = v1();
    const ID2 = v1();
    const newTodoFilter = 'completed'
    const startState: TodoListsType[] = [
        {
            id: ID1, title: 'What to learn', filter: 'all', tasks: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ]
        },
        {
            id: ID2, title: 'What to buy', filter: 'all', tasks: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        },
    ]

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(ID1, newTodoFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(newTodoFilter)
    expect(endState[1].filter).toBe('all')
})

test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListsType[] = [
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
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newTaskTitle = 'vine'

    const startState: TodoListsType[] = [
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
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newTaskTitle = 'vine'

    const startState: TodoListsType[] = [
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
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListsType[] = [
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