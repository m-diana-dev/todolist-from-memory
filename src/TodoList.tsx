import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterType, TasksType, TaskType} from "./App";
import {Button} from "./components/Button";
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type todoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType

    DeleteTask: (idTodoList: string, idTask: string) => void
    DeleteTodoList: (idTodoList: string) => void
    ChangeFilter: (idTodoList: string, filter: FilterType) => void
    addTask: (idTodoList: string, title: string) => void
    ChangeTask: (idTodoList: string, idTask: string, isDone: boolean) => void
    ChangeTaskTitle:(idTodoList: string, idTask: string, title: string)=>void
    ChangeTodoListTitle: (idTodoList: string, title: string) => void
}

export function TodoList(props: todoListPropsType) {
    const OnTaskDelHandler = (idTask: string) => {
        props.DeleteTask(props.id, idTask);
    }
    const OnTodoListDelHandler = () => {
        props.DeleteTodoList(props.id);
    }
    const OnChangeFilterHandler = (filterValue: FilterType) => {
        props.ChangeFilter(props.id, filterValue);
    }

    const OnChangeTaskHandler = (idTask: string, isDone: boolean) => {
        props.ChangeTask(props.id, idTask, isDone);
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const ChangeTodoListTitle = (title: string) => {
        props.ChangeTodoListTitle(props.id, title)
    }


    return (
        <div>
            <h2>
                <EditableSpan title={props.title} onChange={ChangeTodoListTitle}/>
                <Button name={'x'} callback={OnTodoListDelHandler}/>
            </h2>
            <AddItemForm addTitle={addTask}/>
            <ul>
                {props.tasks.map(el => {
                    const ChangeTaskTitle = (title: string) => {
                        props.ChangeTaskTitle(props.id, el.id, title)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'isDone' : undefined}>
                            <input type="checkbox" checked={el.isDone} onChange={(e:ChangeEvent<HTMLInputElement>) => OnChangeTaskHandler(el.id, e.currentTarget.checked)}/>
                            <EditableSpan title={el.title} onChange={ChangeTaskTitle}/>
                            <Button name={'x'} callback={() => OnTaskDelHandler(el.id)}/>
                        </li>
                    )
                })}
            </ul>
            <Button className={props.filter === 'all' ? 'activeFilter' : undefined} name={'all'}
                    callback={() => OnChangeFilterHandler('all')}/>
            <Button className={props.filter === 'active' ? 'activeFilter' : undefined} name={'active'}
                    callback={() => OnChangeFilterHandler('active')}/>
            <Button className={props.filter === 'completed' ? 'activeFilter' : undefined} name={'completed'}
                    callback={() => OnChangeFilterHandler('completed')}/>
        </div>
    );
}