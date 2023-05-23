import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ]
    )
    const [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const filterTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(el => !el.isDone)
            case 'completed':
                return tasks.filter(el => el.isDone)
            default:
                return tasks;
        }
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: true}, ...tasks])
    }
    const CheckTask = (id: string, isDone: boolean) => {
        setTasks(tasks.map(el => (el.id===id) ? {...el, isDone: isDone} : el))
    }

    return (
        <TodoList
            tasks={filterTasks()}
            deleteTask={deleteTask}
            setFilter={setFilter}
            addTask={addTask}
            CheckTask={CheckTask}/>
    );
}

export default App;
