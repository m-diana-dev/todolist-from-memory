import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterBtn = 'All' | 'Active' | 'Completed';

function App() {

    let [tasks, setTasks] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "ReactJS", isDone: false},
            {id: 5, title: "ReactJS", isDone: false}
        ]
    )
    const RemoveTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id));
    }



    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} RemoveTask={RemoveTask}/>
        </div>
    );
}

export default App;
