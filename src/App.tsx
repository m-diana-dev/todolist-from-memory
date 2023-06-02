import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";

export type tasksType = {
    id: string,
    title: string
    isDone: boolean
}

export type filterType = 'All' | 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState<tasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS2", isDone: false}
    ])
    const title = 'What to Learn';
    const [filter, setFilter] = useState<filterType>('All');

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }
    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
    }
    const taskCheckedChange = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(el=>(el.id===taskId) ? {...el, isDone:isDone} : el))
    }
    const filteredTasks = () => {
        if(filter==='Active')return tasks.filter(el=>!el.isDone)
        if(filter==='Completed')return tasks.filter(el=>el.isDone)
        return tasks
    }

    return (
        <div className="App">
            <TodoList tasks={filteredTasks()}
                      title={title}
                      deleteTask={deleteTask}
                      addTask={addTask}
                      setFilter={setFilter}
                      filter={filter}
                      taskCheckedChange={taskCheckedChange}
            />
        </div>
    );
}

export default App;
