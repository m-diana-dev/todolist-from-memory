import React from 'react';
import {FilterType, TaskType} from "../App";
import {Button} from "./Button/Button";
import {AddComponent} from "./AddComponent/AddComponent";
import '../App.css';
import {EditableSpan} from "./EditableSpan/EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (idTodolist: string, idTask: string) => void
    changeTaskStatus:(idTodolist: string, idTask: string, isDone: boolean) => void
    addTask: (idTodolist: string, title: string)=>void
    deleteTodolist: (idTodolist: string)=>void
    changeTodolistFilter: (idTodolist: string, filter: FilterType)=>void
    changeTodolistTitle: (idTodolist: string, title: string)=>void
    changeTaskTitle: (idTodolist: string, idTask: string, title: string)=>void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        id,
        title,
        tasks,
        deleteTask,
        changeTaskStatus,
        addTask,
        deleteTodolist,
        changeTodolistFilter,
        changeTodolistTitle,
        changeTaskTitle
    } = props

    const onDeleteTaskHandler = (idTask: string) => {
        deleteTask(id, idTask)
    }
    const onChangeStatusHandler = (idTask: string, isDone: boolean) => {
        changeTaskStatus(id, idTask, isDone)
    }
    const addTaskCallback = (title: string) => {
        addTask(id, title)
    }

    const tasksFilterHandler = (filter: FilterType) => {
        changeTodolistFilter(id, filter)
    }
    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const changeTaskTitleCallback = (idTask: string, title: string) => {
        changeTaskTitle(id, idTask, title)
    }

    return (
        <div>
            <h2>
                <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
                <Button name={'-'} callback={()=>deleteTodolist(id)}/>
            </h2>
            <AddComponent addNewItem={addTaskCallback}/>
            <ul>
                {tasks.map(el => <li key={el.id} className={el.isDone ? 'isDone' : undefined}>
                    <input type="checkbox" checked={el.isDone} onChange={(e)=>onChangeStatusHandler(el.id, e.currentTarget.checked)}/>
                    <EditableSpan title={el.title} changeTitle={(title: string)=>changeTaskTitleCallback(el.id, title)}/>
                    <Button name={'-'} callback={()=>onDeleteTaskHandler(el.id)}/>
                </li>)}
            </ul>
            <div>
                <Button className={''} name={'all'} callback={()=>tasksFilterHandler('all')}/>
                <Button className={''} name={'active'} callback={()=>tasksFilterHandler('active')}/>
                <Button className={''} name={'completed'} callback={()=>tasksFilterHandler('completed')}/>
            </div>
        </div>
    );
};
