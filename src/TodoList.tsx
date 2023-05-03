import React from 'react';
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
    FilteredTasks:(filterString: FilterBtn)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el)=>{
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
            <button onClick={()=>props.FilteredTasks('All')}>All</button>
            <button onClick={()=>props.FilteredTasks('Active')}>Active</button>
            <button onClick={()=>props.FilteredTasks('Completed')}>Completed</button>
        </div>
    </div>
}
