import React, {useState} from 'react';
import {FilterBtn} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTask: (id: number)=>void
}

export function Todolist(props: PropsType) {


    let [tasksAfterFilter, setTasksAfterFilter] = useState('All');
    const FilteredTasks = (filterString: FilterBtn) => {
        setTasksAfterFilter(filterString);
    }

    const filteredTasksBox = () =>{
        let filteredTasks =  props.tasks;
        if(tasksAfterFilter === 'Active'){
            filteredTasks = props.tasks.filter(el=>!el.isDone);
        } else if (tasksAfterFilter === 'Completed'){
            filteredTasks = props.tasks.filter(el=>el.isDone);
        }
        return filteredTasks;
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTasksBox().map((el)=>{
                return(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>{props.RemoveTask(el.id)}}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>FilteredTasks('All')}>All</button>
            <button onClick={()=>FilteredTasks('Active')}>Active</button>
            <button onClick={()=>FilteredTasks('Completed')}>Completed</button>
        </div>
    </div>
}
