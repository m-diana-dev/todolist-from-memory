import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/todolist";
import {AddComponent} from "./components/AddComponent/AddComponent";

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
    const [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
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
    );

    const deleteTask = (idTodolist: string, idTask: string) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist ? {
            ...todo,
            tasks: todo.tasks.filter(task => task.id !== idTask)
        } : todo))
    }

    const changeTaskStatus = (idTodolist: string, idTask: string, isDone: boolean) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist
            ? {...todo, tasks: todo.tasks.map(task => task.id === idTask ? {...task, isDone} : task)}
            : todo))
    }

    const changeTaskTitle = (idTodolist: string, idTask: string, title: string) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist
            ? {...todo, tasks: todo.tasks.map(task => task.id === idTask ? {...task, title} : task)}
            : todo))
    }

    const addTask = (idTodolist: string, title: string) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist
            ? {...todo, tasks: [{id: v1(), title, isDone: false}, ...todo.tasks]}
            : todo))
    }

    const changeTodolistFilter = (idTodolist: string, filter: FilterType) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist
            ? {...todo, filter}
            : todo))
    }

    const changeTodolistTitle = (idTodolist: string, title: string) => {
        setTodoLists(todoLists.map(todo => todo.id === idTodolist
            ? {...todo, title}
            : todo))
    }
    const addTodolist = (title: string) => {
        setTodoLists([
            {
                id: v1(),
                title,
                filter: 'all',
                tasks: []
            }
            , ...todoLists])
    }
    const deleteTodolist = (idTodolist: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== idTodolist))

    }


    const todolistComponents = todoLists.map(el => {
            let allTodolistTasks = el.tasks;
            let tasksForTodolist =  allTodolistTasks;

            if (el.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
            }
            if (el.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
            }
            return (
                <Todolist id={el.id}
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
