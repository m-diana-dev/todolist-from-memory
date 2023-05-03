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

    let [tasksAfterFilter, setTasksAfterFilter] = useState('All');

    const FilteredTasks = (filterString: FilterBtn) => {
        setTasksAfterFilter(filterString);
    }

    let filteredTasks =  tasks;
    if(tasksAfterFilter === 'Active'){
        filteredTasks = tasks.filter(el=>!el.isDone);
    } else if (tasksAfterFilter === 'Completed'){
        filteredTasks = tasks.filter(el=>el.isDone);
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={filteredTasks} RemoveTask={RemoveTask} FilteredTasks={FilteredTasks}/>
        </div>
    );
}

export default App;
