import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {filterType, tasksType} from "./App";
import {Button} from "./components/Button";

type todoListPropsType = {
    tasks: tasksType[]
    title: string

    deleteTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    setFilter: (filter: filterType) => void
    filter: filterType
    taskCheckedChange: (taskId: string, isDone: boolean)=>void
}

export function TodoList(props: todoListPropsType) {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const delTaskHandler = (taskId: string) => {
        props.deleteTask(taskId)
    }
    const addTaskHandler = () => {
        if (inputTitle.trim()) {
            props.addTask(inputTitle.trim())
            setInputTitle('');
            setError('')
        } else {
            setError('Error');
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    const onFilterHandler = (filterTitle: filterType) => {
        props.setFilter(filterTitle)
    }
    const onCheckedHandler = (taskId:string, e:boolean) => {
        props.taskCheckedChange(taskId, e);
    }

    const inputStyle = (error) ? 'error' : undefined

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onKeyDown={onKeyDownInputHandler} onChange={onChangeInputHandler} value={inputTitle}
                           className={inputStyle}/>
                    <Button name={'add'} callback={addTaskHandler}/>
                </div>
                {error && <div className='error-message'>ERROR!!!!</div>}
                <ul>
                    {
                        props.tasks.map(el => {
                                return (
                                    <li className={(el.isDone) ? 'is-done' : undefined} key={el.id}>
                                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>onCheckedHandler(el.id, e.currentTarget.checked)} type="checkbox" checked={el.isDone}/>
                                        <span>{el.title}</span>
                                        <Button name={'del'} callback={() => delTaskHandler(el.id)}/></li>
                                )
                            }
                        )
                    }
                </ul>
                <div>
                    <Button className={(props.filter === 'All') ? 'active-filter' : undefined} name={'All'}
                            callback={() => onFilterHandler('All')}/>
                    <Button className={(props.filter === 'Active') ? 'active-filter' : undefined} name={'Active'}
                            callback={() => onFilterHandler('Active')}/>
                    <Button className={(props.filter === 'Completed') ? 'active-filter' : undefined} name={'Completed'}
                            callback={() => onFilterHandler('Completed')}/>
                </div>
            </div>
        </div>
    );
}