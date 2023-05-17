import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed'
function App() {

    const [tasks, setTasks] = useState(
        [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "ReactJS", isDone: false }
        ]
    )

    const [filter, setFilter] = useState<filterType>('all');

    const removeTask = (id:string) =>{
        setTasks(tasks.filter(el=>el.id!==id))
    }
    const filterTasks = () =>{
        if(filter==='active')return tasks.filter(el=>!el.isDone);
        else if(filter==='completed')return tasks.filter(el=>el.isDone);
        return tasks;
    }

    const addTask = (title: string) =>{
        setTasks([{ id: v1(), title: title, isDone: false }, ...tasks])
    }

    const CheckedTask = (id:string, checkedValue:boolean) =>{
        setTasks(tasks.map(el=>el.id===id ? {...el, isDone:checkedValue} : el))//вызвало проблему, обратить внимание, повторить еще раз
    }

    return (
        <div className="App">
            <TodoList title="What to learn" tasks={filterTasks()} removeTask={removeTask} setFilter={setFilter} addTask={addTask} filter={filter} CheckedTask={CheckedTask}/>
        </div>
    );
}

export default App;
