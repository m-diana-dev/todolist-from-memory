import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterType, TasksType, TaskType} from "./App";
import {Button} from "./components/Button";
import './App.css';

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
}

export function TodoList(props: todoListPropsType) {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const OnTaskDelHandler = (idTask: string) => {
        props.DeleteTask(props.id, idTask);
    }
    const OnTodoListDelHandler = () => {
        props.DeleteTodoList(props.id);
    }
    const OnChangeFilterHandler = (filterValue: FilterType) => {
        props.ChangeFilter(props.id, filterValue);
    }

    const OnAddTaskHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(props.id, inputTitle.trim())
            setInputTitle('');
        } else {
            setError('Error');
        }
    }


    const OnChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
        setError('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            OnAddTaskHandler();
        }
    }

    const OnChangeTaskHandler = (idTask: string, isDone: boolean) => {
        props.ChangeTask(props.id, idTask, isDone);
    }


    return (
        <div>
            <h2>
                {props.title}
                <Button name={'x'} callback={OnTodoListDelHandler}/>
            </h2>
            <input className={error ? 'error' : undefined} type="text" onChange={OnChangeInputHandler} onKeyDown={onKeyDownHandler}
                   value={inputTitle}/>
            <Button name={'+'} callback={OnAddTaskHandler}/>
            {error && <div className='errorMessage'>{error}</div>}
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id} className={el.isDone ? 'isDone' : undefined}>
                            <input type="checkbox" checked={el.isDone} onChange={(e:ChangeEvent<HTMLInputElement>) => OnChangeTaskHandler(el.id, e.currentTarget.checked)}/>
                            <span>{el.title}</span>
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