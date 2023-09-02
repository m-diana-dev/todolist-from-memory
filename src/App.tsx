import React from 'react';
import './App.css';
import {Todolist} from "./components/todolist";
import {AddComponent} from "./components/AddComponent/AddComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./reducer/store";
import {
    AddTaskAC, AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    DeleteTaskAC, DeleteTodolistAC
} from "./reducer/todolist-reducer";

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]
}

function App() {
    const todoLists = useSelector<AppStateType, TodoListsType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const deleteTask = (idTodolist: string, idTask: string) => {
        dispatch(DeleteTaskAC(idTodolist, idTask))
    }

    const changeTaskStatus = (idTodolist: string, idTask: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(idTodolist, idTask, isDone))
    }

    const changeTaskTitle = (idTodolist: string, idTask: string, title: string) => {
        dispatch(ChangeTaskTitleAC(idTodolist, idTask, title))
    }

    const addTask = (idTodolist: string, title: string) => {
        dispatch(AddTaskAC(idTodolist, title))
    }

    const changeTodolistFilter = (idTodolist: string, filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(idTodolist, filter))
    }

    const changeTodolistTitle = (idTodolist: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(idTodolist, title))
    }
    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
    }
    const deleteTodolist = (idTodolist: string) => {
        dispatch(DeleteTodolistAC(idTodolist))

    }


    const todolistComponents = todoLists.map(el => {
            let allTodolistTasks = el.tasks;
            let tasksForTodolist = allTodolistTasks;

            if (el.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
            }
            if (el.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
            }
            return (
                <Todolist key={el.id}
                          id={el.id}
                          title={el.title}
                          tasks={tasksForTodolist}
                          deleteTask={deleteTask}
                          changeTaskStatus={changeTaskStatus}
                          addTask={addTask}
                          deleteTodolist={deleteTodolist}
                          changeTodolistFilter={changeTodolistFilter}
                          changeTodolistTitle={changeTodolistTitle}
                          changeTaskTitle={changeTaskTitle}/>
            )
        }
    )

    return (
        <div className="App">
            <AddComponent addNewItem={addTodolist}/>
            {todolistComponents}
        </div>
    )
}


export default App;
